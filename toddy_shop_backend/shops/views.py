from django.db.models import Avg, Count
from django.shortcuts import get_object_or_404
from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.views import APIView

from core.models import Status
from shared.permissions import IsAdmin, IsShopOwner, IsShopOwnerOrAdmin
from shared.responses import APIResponse

from .models import (
    ShopFoodItem,
    ShopLicense,
    ShopMedia,
    ShopRating,
    ShopReview,
    ToddyShop,
)
from .serializers import (
    ShopFoodItemSerializer,
    ShopLicenseSerializer,
    ShopMediaSerializer,
    ShopRatingSerializer,
    ShopReviewSerializer,
    ToddyShopDetailSerializer,
    ToddyShopListSerializer,
    ToddyShopWriteSerializer,
)

# ---------------------------------------------------------------------------
# ToddyShop
# ---------------------------------------------------------------------------


class ToddyShopViewSet(viewsets.ModelViewSet):

    def get_queryset(self):
        qs = ToddyShop.objects.select_related(
            "place__district", "category", "status", "owner__role"
        ).prefetch_related(
            "facilities", "hygiene_tags"
        ).annotate(
            avg_rating=Avg("ratings__score"),
            review_count=Count("reviews", distinct=True),
        )

        user = self.request.user
        if not (user.is_authenticated and user.is_admin):
            qs = qs.filter(status__name="Active")

        params = self.request.query_params
        if district := params.get("district"):
            qs = qs.filter(place__district_id=district)
        if category := params.get("category"):
            qs = qs.filter(category_id=category)
        if place := params.get("place"):
            qs = qs.filter(place_id=place)
        if search := params.get("search"):
            qs = qs.filter(name__icontains=search)

        return qs

    def get_serializer_class(self):
        if self.action == "list":
            return ToddyShopListSerializer
        if self.action in ("create", "update", "partial_update"):
            return ToddyShopWriteSerializer
        return ToddyShopDetailSerializer

    def get_permissions(self):
        if self.action in ("list", "retrieve"):
            return [permissions.AllowAny()]
        if self.action == "create":
            return [IsShopOwner()]
        if self.action in ("update", "partial_update"):
            return [IsShopOwnerOrAdmin()]
        if self.action == "destroy":
            return [IsAdmin()]
        return [permissions.IsAuthenticated()]

    def list(self, request, *args, **kwargs):
        qs = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(qs)
        if page is not None:
            data = ToddyShopListSerializer(
                page, many=True, context={"request": request}
            ).data
            return self.get_paginated_response(data)
        data = ToddyShopListSerializer(qs, many=True, context={"request": request}).data
        return APIResponse(data=data, message="Shops retrieved successfully.")

    def retrieve(self, request, *args, **kwargs):
        shop = self.get_object()
        data = ToddyShopDetailSerializer(shop, context={"request": request}).data
        return APIResponse(data=data, message="Shop retrieved successfully.")

    def create(self, request, *args, **kwargs):
        serializer = ToddyShopWriteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        pending = get_object_or_404(Status, name="Pending")
        shop = serializer.save(owner=request.user, status=pending)
        data = ToddyShopDetailSerializer(shop, context={"request": request}).data
        return APIResponse(
            data=data,
            message="Shop submitted for approval.",
            status=201,
        )

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        shop = self.get_object()

        if request.user.is_shop_owner and shop.owner != request.user:
            return APIResponse(
                data=None,
                message="You can only update your own shops.",
                status=403,
                is_success=False,
            )

        serializer = ToddyShopWriteSerializer(shop, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        shop = serializer.save()
        data = ToddyShopDetailSerializer(shop, context={"request": request}).data
        return APIResponse(data=data, message="Shop updated successfully.")

    def destroy(self, request, *args, **kwargs):
        self.get_object().delete()
        return APIResponse(data=None, message="Shop deleted successfully.")

    @action(detail=True, methods=["post"], permission_classes=[IsAdmin])
    def approve(self, request, pk=None):
        shop = self.get_object()
        shop.status = get_object_or_404(Status, name="Active")
        shop.save(update_fields=["status", "updated_at"])
        data = ToddyShopDetailSerializer(shop, context={"request": request}).data
        return APIResponse(data=data, message="Shop approved and is now active.")

    @action(detail=True, methods=["post"], permission_classes=[IsAdmin])
    def suspend(self, request, pk=None):
        shop = self.get_object()
        shop.status = get_object_or_404(Status, name="Suspended")
        shop.save(update_fields=["status", "updated_at"])
        data = ToddyShopDetailSerializer(shop, context={"request": request}).data
        return APIResponse(data=data, message="Shop has been suspended.")


# ---------------------------------------------------------------------------
# Shop License
# ---------------------------------------------------------------------------


class ShopLicenseView(APIView):

    def get_permissions(self):
        if self.request.method == "GET":
            return [permissions.AllowAny()]
        return [IsAdmin()]

    def _get_shop(self, shop_pk):
        return get_object_or_404(ToddyShop, pk=shop_pk)

    def get(self, request, shop_pk):
        shop = self._get_shop(shop_pk)
        license_obj = getattr(shop, "license", None)
        if not license_obj:
            return APIResponse(data=None, message="No license on record for this shop.")
        return APIResponse(
            data=ShopLicenseSerializer(license_obj).data,
            message="License retrieved.",
        )

    def post(self, request, shop_pk):
        shop = self._get_shop(shop_pk)
        if hasattr(shop, "license"):
            return APIResponse(
                data=None,
                message="A license already exists for this shop. Use PATCH to update.",
                status=400,
                is_success=False,
            )
        serializer = ShopLicenseSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(shop=shop)
        return APIResponse(data=serializer.data, message="License created.", status=201)

    def patch(self, request, shop_pk):
        shop = self._get_shop(shop_pk)
        license_obj = get_object_or_404(ShopLicense, shop=shop)
        serializer = ShopLicenseSerializer(license_obj, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return APIResponse(data=serializer.data, message="License updated.")


# ---------------------------------------------------------------------------
# Shop Food Items
# ---------------------------------------------------------------------------


class ShopFoodItemView(APIView):

    def get_permissions(self):
        if self.request.method == "GET":
            return [permissions.AllowAny()]
        return [IsShopOwnerOrAdmin()]

    def _get_shop(self, shop_pk):
        return get_object_or_404(ToddyShop, pk=shop_pk)

    def _check_ownership(self, request, shop):
        if request.user.is_shop_owner and shop.owner != request.user:
            return APIResponse(
                data=None,
                message="You can only manage food items for your own shops.",
                status=403,
                is_success=False,
            )
        return None

    def get(self, request, shop_pk):
        shop = self._get_shop(shop_pk)
        items = shop.shop_food_items.select_related("food_item__food_category").all()
        return APIResponse(
            data=ShopFoodItemSerializer(items, many=True).data,
            message="Food items retrieved.",
        )

    def post(self, request, shop_pk):
        shop = self._get_shop(shop_pk)
        denied = self._check_ownership(request, shop)
        if denied:
            return denied
        serializer = ShopFoodItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(shop=shop)
        return APIResponse(data=serializer.data, message="Food item added.", status=201)


class ShopFoodItemDetailView(APIView):
    permission_classes = [IsShopOwnerOrAdmin]

    def _get_item(self, shop_pk, pk):
        return get_object_or_404(ShopFoodItem, pk=pk, shop_id=shop_pk)

    def _check_ownership(self, request, item):
        if request.user.is_shop_owner and item.shop.owner != request.user:
            return APIResponse(
                data=None,
                message="You can only manage food items for your own shops.",
                status=403,
                is_success=False,
            )
        return None

    def patch(self, request, shop_pk, pk):
        item = self._get_item(shop_pk, pk)
        denied = self._check_ownership(request, item)
        if denied:
            return denied
        serializer = ShopFoodItemSerializer(item, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return APIResponse(data=serializer.data, message="Food item updated.")

    def delete(self, request, shop_pk, pk):
        item = self._get_item(shop_pk, pk)
        denied = self._check_ownership(request, item)
        if denied:
            return denied
        item.delete()
        return APIResponse(data=None, message="Food item removed.")


# ---------------------------------------------------------------------------
# Shop Media
# ---------------------------------------------------------------------------


class ShopMediaView(APIView):

    def get_permissions(self):
        if self.request.method == "GET":
            return [permissions.AllowAny()]
        return [IsShopOwnerOrAdmin()]

    def _get_shop(self, shop_pk):
        return get_object_or_404(ToddyShop, pk=shop_pk)

    def get(self, request, shop_pk):
        shop = self._get_shop(shop_pk)
        media = shop.media.select_related("media_type", "uploaded_by").all()
        return APIResponse(
            data=ShopMediaSerializer(
                media, many=True, context={"request": request}
            ).data,
            message="Media retrieved.",
        )

    def post(self, request, shop_pk):
        shop = self._get_shop(shop_pk)
        if request.user.is_shop_owner and shop.owner != request.user:
            return APIResponse(
                data=None,
                message="You can only upload media for your own shops.",
                status=403,
                is_success=False,
            )
        serializer = ShopMediaSerializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save(shop=shop, uploaded_by=request.user)
        return APIResponse(data=serializer.data, message="Media uploaded.", status=201)


class ShopMediaDetailView(APIView):
    permission_classes = [IsShopOwnerOrAdmin]

    def delete(self, request, shop_pk, pk):
        media = get_object_or_404(ShopMedia, pk=pk, shop_id=shop_pk)
        if request.user.is_shop_owner and media.shop.owner != request.user:
            return APIResponse(
                data=None,
                message="You can only delete media from your own shops.",
                status=403,
                is_success=False,
            )
        media.file.delete(save=False)
        media.delete()
        return APIResponse(data=None, message="Media deleted.")


# ---------------------------------------------------------------------------
# Shop Reviews
# ---------------------------------------------------------------------------


class ShopReviewView(APIView):

    def get_permissions(self):
        if self.request.method == "GET":
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def _get_shop(self, shop_pk):
        return get_object_or_404(ToddyShop, pk=shop_pk)

    def get(self, request, shop_pk):
        shop = self._get_shop(shop_pk)
        reviews = shop.reviews.select_related("user", "category", "status")
        # Admin sees all; others see only published reviews
        if not (request.user.is_authenticated and request.user.is_admin):
            reviews = reviews.filter(status__name="Published")
        return APIResponse(
            data=ShopReviewSerializer(reviews, many=True).data,
            message="Reviews retrieved.",
        )

    def post(self, request, shop_pk):
        shop = self._get_shop(shop_pk)
        if shop.reviews.filter(user=request.user).exists():
            return APIResponse(
                data=None,
                message="You have already reviewed this shop.",
                status=400,
                is_success=False,
            )
        published = get_object_or_404(Status, name="Published")
        serializer = ShopReviewSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(shop=shop, user=request.user, status=published)
        return APIResponse(
            data=serializer.data, message="Review submitted.", status=201
        )


class ShopReviewDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def _get_review(self, shop_pk, pk):
        return get_object_or_404(ShopReview, pk=pk, shop_id=shop_pk)

    def _check_permission(self, request, review):
        if review.user != request.user and not request.user.is_admin:
            return APIResponse(
                data=None,
                message="You can only modify your own reviews.",
                status=403,
                is_success=False,
            )
        return None

    def get(self, request, shop_pk, pk):
        review = self._get_review(shop_pk, pk)
        return APIResponse(
            data=ShopReviewSerializer(review).data,
            message="Review retrieved.",
        )

    def patch(self, request, shop_pk, pk):
        review = self._get_review(shop_pk, pk)
        denied = self._check_permission(request, review)
        if denied:
            return denied
        serializer = ShopReviewSerializer(review, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return APIResponse(data=serializer.data, message="Review updated.")

    def delete(self, request, shop_pk, pk):
        review = self._get_review(shop_pk, pk)
        denied = self._check_permission(request, review)
        if denied:
            return denied
        review.delete()
        return APIResponse(data=None, message="Review deleted.")


# ---------------------------------------------------------------------------
# Shop Ratings  (upsert — one score per rating type per user per shop)
# ---------------------------------------------------------------------------


class ShopRatingView(APIView):

    def get_permissions(self):
        if self.request.method == "GET":
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def _get_shop(self, shop_pk):
        return get_object_or_404(ToddyShop, pk=shop_pk)

    def get(self, request, shop_pk):
        shop = self._get_shop(shop_pk)
        ratings = shop.ratings.select_related("user", "rating_type").all()
        return APIResponse(
            data=ShopRatingSerializer(ratings, many=True).data,
            message="Ratings retrieved.",
        )

    def post(self, request, shop_pk):
        shop = self._get_shop(shop_pk)
        serializer = ShopRatingSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        rating, created = ShopRating.objects.update_or_create(
            shop=shop,
            user=request.user,
            rating_type=serializer.validated_data["rating_type"],
            defaults={"score": serializer.validated_data["score"]},
        )
        return APIResponse(
            data=ShopRatingSerializer(rating).data,
            message="Rating submitted." if created else "Rating updated.",
            status=201 if created else 200,
        )
