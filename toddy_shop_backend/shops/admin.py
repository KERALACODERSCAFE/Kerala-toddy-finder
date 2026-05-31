from django.contrib import admin
from import_export.admin import ImportExportModelAdmin

from core.models import District, Place

from .models import (
    ShopFoodItem,
    ShopLicense,
    ShopMedia,
    ShopRating,
    ShopReview,
    ToddyShop,
    FavoriteShop,
)
from .resources import ToddyShopResource


class ShopLicenseInline(admin.StackedInline):
    model = ShopLicense
    extra = 0


class ShopFoodItemInline(admin.TabularInline):
    model = ShopFoodItem
    extra = 0
    autocomplete_fields = ["food_item"]


@admin.register(ToddyShop)
class ToddyShopAdmin(ImportExportModelAdmin):
    resource_class = ToddyShopResource
    list_display = ["id", "name", "owner", "category", "place", "status", "created_at"]
    list_filter = ["status", "category", "place__district"]
    search_fields = ["name", "owner__username", "address"]
    filter_horizontal = ["facilities", "hygiene_tags"]
    inlines = [ShopLicenseInline, ShopFoodItemInline]
    readonly_fields = ["created_at", "updated_at"]
    autocomplete_fields = ["owner", "place", "category", "status"]

    def save_model(self, request, obj, form, change):
        place_name = form.data.get("place_name")
        district_id = form.data.get("district")
        if place_name and district_id:
            district = District.objects.get(id=district_id)
            place, _ = Place.objects.get_or_create(
                name=place_name,
                district=district,
                defaults={
                    "latitude": form.data.get("latitude") or None,
                    "longitude": form.data.get("longitude") or None,
                },
            )
            obj.place = place
        super().save_model(request, obj, form, change)

    def get_queryset(self, request):
        return super().get_queryset(request).select_related("owner", "category", "place__district", "status")


@admin.register(FavoriteShop)
class FavoriteShopAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "shop", "created_at"]
    list_filter = ["shop__place__district"]
    search_fields = ["user__username", "shop__name"]
    readonly_fields = ["created_at"]


@admin.register(ShopLicense)
class ShopLicenseAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "shop",
        "license_number",
        "license_type",
        "license_status",
        "expiry_date",
    ]
    list_filter = ["license_status", "license_type"]
    search_fields = ["license_number", "shop__name"]


@admin.register(ShopFoodItem)
class ShopFoodItemAdmin(admin.ModelAdmin):
    list_display = ["id", "shop", "food_item", "price", "is_available"]
    list_filter = ["is_available", "food_item__food_category"]
    search_fields = ["shop__name", "food_item__name"]


@admin.register(ShopMedia)
class ShopMediaAdmin(admin.ModelAdmin):
    list_display = ["id", "shop", "media_type", "uploaded_by", "created_at"]
    list_filter = ["media_type"]
    search_fields = ["shop__name"]


@admin.register(ShopReview)
class ShopReviewAdmin(admin.ModelAdmin):
    list_display = ["id", "shop", "user", "category", "status", "created_at"]
    list_filter = ["status", "category"]
    search_fields = ["shop__name", "user__username", "body"]
    readonly_fields = ["created_at", "updated_at"]


@admin.register(ShopRating)
class ShopRatingAdmin(admin.ModelAdmin):
    list_display = ["id", "shop", "user", "rating_type", "score", "created_at"]
    list_filter = ["rating_type", "score"]
    search_fields = ["shop__name", "user__username"]
