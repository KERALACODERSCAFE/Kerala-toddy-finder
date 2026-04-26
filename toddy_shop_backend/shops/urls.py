from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register("shops", views.ToddyShopViewSet, basename="shop")

urlpatterns = list(router.urls) + [
    # License  (one-to-one per shop, admin-managed)
    path(
        "shops/<int:shop_pk>/license/",
        views.ShopLicenseView.as_view(),
        name="shop-license",
    ),
    # Food items
    path(
        "shops/<int:shop_pk>/food-items/",
        views.ShopFoodItemView.as_view(),
        name="shop-food-items",
    ),
    path(
        "shops/<int:shop_pk>/food-items/<int:pk>/",
        views.ShopFoodItemDetailView.as_view(),
        name="shop-food-item-detail",
    ),
    # Media
    path(
        "shops/<int:shop_pk>/media/",
        views.ShopMediaView.as_view(),
        name="shop-media",
    ),
    path(
        "shops/<int:shop_pk>/media/<int:pk>/",
        views.ShopMediaDetailView.as_view(),
        name="shop-media-detail",
    ),
    # Reviews
    path(
        "shops/<int:shop_pk>/reviews/",
        views.ShopReviewView.as_view(),
        name="shop-reviews",
    ),
    path(
        "shops/<int:shop_pk>/reviews/<int:pk>/",
        views.ShopReviewDetailView.as_view(),
        name="shop-review-detail",
    ),
    # Ratings
    path(
        "shops/<int:shop_pk>/ratings/",
        views.ShopRatingView.as_view(),
        name="shop-ratings",
    ),
    # Operating Hours
    path(
        "shops/<int:shop_pk>/hours/",
        views.ShopOperatingHoursView.as_view(),
        name="shop-hours",
    ),
    path(
        "shops/<int:shop_pk>/hours/<int:pk>/",
        views.ShopOperatingHoursDetailView.as_view(),
        name="shop-hours-detail",
    ),
]
