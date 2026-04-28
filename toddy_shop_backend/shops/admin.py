from django.contrib import admin

from .models import (
    ShopFoodItem,
    ShopLicense,
    ShopMedia,
    ShopRating,
    ShopReview,
    ToddyShop,
)


class ShopLicenseInline(admin.StackedInline):
    model = ShopLicense
    extra = 0


class ShopFoodItemInline(admin.TabularInline):
    model = ShopFoodItem
    extra = 0


@admin.register(ToddyShop)
class ToddyShopAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "owner", "category", "place", "status", "created_at"]
    list_filter = ["status", "category", "place__district"]
    search_fields = ["name", "owner__username", "address"]
    filter_horizontal = ["facilities", "hygiene_tags"]
    inlines = [ShopLicenseInline, ShopFoodItemInline]
    readonly_fields = ["created_at", "updated_at"]

    def get_queryset(self, request):
        return super().get_queryset(request).select_related("owner", "category", "place__district", "status")


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
