from rest_framework import generics, permissions, viewsets
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.throttling import AnonRateThrottle, UserRateThrottle
from drf_spectacular.utils import extend_schema

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
# Rate Limiting
# ---------------------------------------------------------------------------
class LoginRateThrottle(AnonRateThrottle):
    rate = "5/minute"




# ---------------------------------------------------------------------------
# Auth
# ---------------------------------------------------------------------------


@extend_schema(tags=["Authentication"])
class RegisterView(generics.CreateAPIView):
    throttle_classes = [LoginRateThrottle]
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
    throttle_classes = [LoginRateThrottle]
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as exc:
            raise InvalidToken(exc.args[0])
        return APIResponse(data=serializer.validated_data, message="Login successful.")


@extend_schema(tags=["Authentication"])
class TokenRefreshAPIView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as exc:
            raise InvalidToken(exc.args[0])
        return APIResponse(data=serializer.validated_data, message="Token refreshed.")


@extend_schema(tags=["Authentication"])
class MeView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def retrieve(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_object())
        return APIResponse(data=serializer.data, message="Profile retrieved.")


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
        return APIResponse(
            data=serializer.data, message="Created successfully.", status=201
        )

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
