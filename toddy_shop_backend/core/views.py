from django.db.models import Avg, Count, Q
from drf_spectacular.utils import extend_schema
from rest_framework import generics, permissions, viewsets
from rest_framework.decorators import action
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from shared.permissions import IsAdminOrReadOnly
from shared.responses import APIResponse

from .models import (
    District,
    Facility,
    FoodCategory,
    FoodItem,
    HygieneTag,
    LicenseType,
    MediaType,
    Place,
    RatingType,
    ReviewCategory,
    ShopCategory,
    Status,
    UserRole,
)
from .serializers import (
    DistrictSerializer,
    FacilitySerializer,
    FoodCategorySerializer,
    FoodItemSerializer,
    HygieneTagSerializer,
    LicenseTypeSerializer,
    MediaTypeSerializer,
    PlaceSerializer,
    RatingTypeSerializer,
    RegisterSerializer,
    ReviewCategorySerializer,
    ShopCategorySerializer,
    StatusSerializer,
    UserRoleSerializer,
    UserSerializer,
)

# ---------------------------------------------------------------------------
# Auth
# ---------------------------------------------------------------------------


@extend_schema(tags=["Authentication"])
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return APIResponse(
            data=UserSerializer(user).data,
            message="Registration successful.",
            status=201,
        )


@extend_schema(tags=["Authentication"])
class LoginView(TokenObtainPairView):
    """Returns JWT access + refresh tokens."""

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as exc:
            raise InvalidToken(exc.args[0]) from exc
        return APIResponse(data=serializer.validated_data, message="Login successful.")


@extend_schema(tags=["Authentication"])
class TokenRefreshAPIView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as exc:
            raise InvalidToken(exc.args[0]) from exc
        return APIResponse(data=serializer.validated_data, message="Token refreshed.")


@extend_schema(tags=["Authentication"])
class MeView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def retrieve(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_object())
        return APIResponse(data=serializer.data, message="Profile retrieved.")

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return APIResponse(data=serializer.data, message="Profile updated successfully.")


# ---------------------------------------------------------------------------
# Lookup ViewSet base
# ---------------------------------------------------------------------------


@extend_schema(tags=["Lookups"])
class LookupViewSet(viewsets.ModelViewSet):
    """Read-only for everyone; full CRUD for admins."""

    permission_classes = [IsAdminOrReadOnly]

    def list(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_queryset(), many=True)
        return APIResponse(data=serializer.data, message="Data retrieved successfully.")

    def retrieve(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_object())
        return APIResponse(data=serializer.data, message="Data retrieved successfully.")

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return APIResponse(data=serializer.data, message="Created successfully.", status=201)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return APIResponse(data=serializer.data, message="Updated successfully.")

    def destroy(self, request, *args, **kwargs):
        self.get_object().delete()
        return APIResponse(data=None, message="Deleted successfully.")


# ---------------------------------------------------------------------------
# Lookup ViewSets
# ---------------------------------------------------------------------------


@extend_schema(tags=["Lookups"])
class UserRoleViewSet(LookupViewSet):
    queryset = UserRole.objects.all()
    serializer_class = UserRoleSerializer


@extend_schema(tags=["Lookups"])
class StatusViewSet(LookupViewSet):
    queryset = Status.objects.all()
    serializer_class = StatusSerializer


@extend_schema(tags=["Lookups"])
class DistrictViewSet(LookupViewSet):
    queryset = District.objects.all()
    serializer_class = DistrictSerializer

    @action(detail=False, methods=["get"], permission_classes=[permissions.AllowAny])
    def stats(self, request):
        active_filter = Q(places__toddyshops__status__name="Active")
        districts = District.objects.annotate(
            shop_count=Count(
                "places__toddyshops",
                filter=active_filter,
                distinct=True,
            ),
            avg_rating=Avg(
                "places__toddyshops__ratings__score",
                filter=active_filter,
            ),
        ).order_by("-shop_count", "name")

        data = [
            {
                "id": d.id,
                "name": d.name,
                "shop_count": d.shop_count,
                "avg_rating": (round(d.avg_rating, 1) if d.avg_rating is not None else None),
            }
            for d in districts
        ]
        return APIResponse(data=data, message="District statistics retrieved.")


@extend_schema(tags=["Lookups"])
class PlaceViewSet(LookupViewSet):
    queryset = Place.objects.select_related("district").all()
    serializer_class = PlaceSerializer
    filterset_fields = ["district"]


@extend_schema(tags=["Lookups"])
class ShopCategoryViewSet(LookupViewSet):
    queryset = ShopCategory.objects.all()
    serializer_class = ShopCategorySerializer


@extend_schema(tags=["Lookups"])
class FoodCategoryViewSet(LookupViewSet):
    queryset = FoodCategory.objects.all()
    serializer_class = FoodCategorySerializer


@extend_schema(tags=["Lookups"])
class FoodItemViewSet(LookupViewSet):
    queryset = FoodItem.objects.select_related("food_category").all()
    serializer_class = FoodItemSerializer
    filterset_fields = ["food_category"]


@extend_schema(tags=["Lookups"])
class FacilityViewSet(LookupViewSet):
    queryset = Facility.objects.all()
    serializer_class = FacilitySerializer


@extend_schema(tags=["Lookups"])
class HygieneTagViewSet(LookupViewSet):
    queryset = HygieneTag.objects.all()
    serializer_class = HygieneTagSerializer


@extend_schema(tags=["Lookups"])
class RatingTypeViewSet(LookupViewSet):
    queryset = RatingType.objects.all()
    serializer_class = RatingTypeSerializer


@extend_schema(tags=["Lookups"])
class MediaTypeViewSet(LookupViewSet):
    queryset = MediaType.objects.all()
    serializer_class = MediaTypeSerializer


@extend_schema(tags=["Lookups"])
class LicenseTypeViewSet(LookupViewSet):
    queryset = LicenseType.objects.all()
    serializer_class = LicenseTypeSerializer


@extend_schema(tags=["Lookups"])
class ReviewCategoryViewSet(LookupViewSet):
    queryset = ReviewCategory.objects.all()
    serializer_class = ReviewCategorySerializer


@extend_schema(tags=["System"])
class HealthCheckView(generics.GenericAPIView):
    """
    Checks the health of the API and its dependencies.
    """

    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        from django.db import connection

        health_data = {
            "api": "healthy",
            "database": "unhealthy",
        }

        try:
            connection.ensure_connection()
            health_data["database"] = "healthy"
            return APIResponse(data=health_data, message="API is healthy.")
        except Exception as e:
            health_data["database"] = f"error: {str(e)}"
            return APIResponse(
                data=health_data,
                message="API is unhealthy.",
                status=503,
                is_success=False,
            )
