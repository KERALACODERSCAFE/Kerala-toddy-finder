from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register("user-roles", views.UserRoleViewSet, basename="user-role")
router.register("statuses", views.StatusViewSet, basename="status")
router.register("districts", views.DistrictViewSet, basename="district")
router.register("places", views.PlaceViewSet, basename="place")
router.register("shop-categories", views.ShopCategoryViewSet, basename="shop-category")
router.register("food-categories", views.FoodCategoryViewSet, basename="food-category")
router.register("food-items", views.FoodItemViewSet, basename="food-item")
router.register("facilities", views.FacilityViewSet, basename="facility")
router.register("hygiene-tags", views.HygieneTagViewSet, basename="hygiene-tag")
router.register("rating-types", views.RatingTypeViewSet, basename="rating-type")
router.register("media-types", views.MediaTypeViewSet, basename="media-type")
router.register("license-types", views.LicenseTypeViewSet, basename="license-type")
router.register("review-categories", views.ReviewCategoryViewSet, basename="review-category")

urlpatterns = [
    # Auth
    path("auth/register/", views.RegisterView.as_view(), name="auth-register"),
    path("auth/login/", views.LoginView.as_view(), name="auth-login"),
    path(
        "auth/token/refresh/",
        views.TokenRefreshAPIView.as_view(),
        name="auth-token-refresh",
    ),
    path("auth/me/", views.MeView.as_view(), name="auth-me"),
    # Lookup data
    path("health/", views.HealthCheckView.as_view(), name="health-check"),
    path("", include(router.urls)),
]
