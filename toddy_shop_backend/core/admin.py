from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

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
    User,
    UserRole,
)


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    fieldsets = BaseUserAdmin.fieldsets + (("Profile", {"fields": ("role", "phone")}),)
    list_display = ["username", "email", "phone", "role", "is_staff", "date_joined"]
    list_filter = ["role", "is_staff", "is_active"]
    search_fields = ["username", "email", "phone"]


@admin.register(UserRole)
class UserRoleAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]


@admin.register(Status)
class StatusAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]
    search_fields = ["name"]


@admin.register(District)
class DistrictAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]
    search_fields = ["name"]


@admin.register(Place)
class PlaceAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "district", "latitude", "longitude"]
    list_filter = ["district"]
    search_fields = ["name"]


@admin.register(ShopCategory)
class ShopCategoryAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]
    search_fields = ["name"]


@admin.register(FoodCategory)
class FoodCategoryAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]


@admin.register(FoodItem)
class FoodItemAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "food_category"]
    list_filter = ["food_category"]
    search_fields = ["name"]


@admin.register(Facility)
class FacilityAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]


@admin.register(HygieneTag)
class HygieneTagAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]


@admin.register(RatingType)
class RatingTypeAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]


@admin.register(MediaType)
class MediaTypeAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]


@admin.register(LicenseType)
class LicenseTypeAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]


@admin.register(ReviewCategory)
class ReviewCategoryAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]
