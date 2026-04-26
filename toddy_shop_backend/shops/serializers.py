from django.db.models import Avg
from rest_framework import serializers

from core.models import Facility, HygieneTag
from core.serializers import (
    FacilitySerializer,
    HygieneTagSerializer,
    LicenseTypeSerializer,
    MediaTypeSerializer,
    PlaceReadSerializer,
    RatingTypeSerializer,
    ReviewCategorySerializer,
    ShopCategorySerializer,
    StatusSerializer,
    UserSerializer,
)

from .models import (
    ShopFoodItem,
    ShopLicense,
    ShopMedia,
    ShopRating,
    ShopReview,
    ToddyShop,
)


class ShopLicenseSerializer(serializers.ModelSerializer):
    license_type_detail = LicenseTypeSerializer(source="license_type", read_only=True)
    license_status_display = serializers.CharField(
        source="get_license_status_display", read_only=True
    )

    class Meta:
        model = ShopLicense
        fields = [
            "id",
            "license_type",
            "license_type_detail",
            "license_number",
            "issued_date",
            "expiry_date",
            "license_status",
            "license_status_display",
        ]
        extra_kwargs = {"license_type": {"write_only": True}}


class ShopFoodItemSerializer(serializers.ModelSerializer):
    food_item_name = serializers.CharField(source="food_item.name", read_only=True)
    food_category_name = serializers.CharField(
        source="food_item.food_category.name", read_only=True
    )

    class Meta:
        model = ShopFoodItem
        fields = [
            "id",
            "food_item",
            "food_item_name",
            "food_category_name",
            "price",
            "is_available",
        ]


class ShopMediaSerializer(serializers.ModelSerializer):
    media_type_detail = MediaTypeSerializer(source="media_type", read_only=True)
    file_url = serializers.SerializerMethodField()

    class Meta:
        model = ShopMedia
        fields = [
            "id",
            "media_type",
            "media_type_detail",
            "file",
            "file_url",
            "caption",
            "created_at",
        ]
        extra_kwargs = {
            "media_type": {"write_only": True},
            "file": {"write_only": True},
        }

    def get_file_url(self, obj):
        request = self.context.get("request")
        if obj.file:
            return request.build_absolute_uri(obj.file.url) if request else obj.file.url
        return None


class ShopReviewSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    category_detail = ReviewCategorySerializer(source="category", read_only=True)
    status_detail = StatusSerializer(source="status", read_only=True)

    class Meta:
        model = ShopReview
        fields = [
            "id",
            "username",
            "category",
            "category_detail",
            "title",
            "body",
            "status",
            "status_detail",
            "created_at",
            "updated_at",
        ]
        extra_kwargs = {
            "category": {"write_only": True},
            "status": {"read_only": True},
        }


class ShopRatingSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    rating_type_detail = RatingTypeSerializer(source="rating_type", read_only=True)

    class Meta:
        model = ShopRating
        fields = [
            "id",
            "username",
            "rating_type",
            "rating_type_detail",
            "score",
            "created_at",
        ]
        extra_kwargs = {"rating_type": {"write_only": True}}


class ToddyShopListSerializer(serializers.ModelSerializer):
    place = PlaceReadSerializer(read_only=True)
    category = ShopCategorySerializer(read_only=True)
    status = StatusSerializer(read_only=True)
    avg_rating = serializers.SerializerMethodField()
    review_count = serializers.IntegerField(source="reviews.count", read_only=True)
    distance_km = serializers.FloatField(read_only=True, default=None)

    class Meta:
        model = ToddyShop
        fields = [
            "id",
            "name",
            "place",
            "category",
            "status",
            "avg_rating",
            "review_count",
            "distance_km",
            "created_at",
        ]

    def get_avg_rating(self, obj):
        result = obj.ratings.aggregate(avg=Avg("score"))
        avg = result.get("avg")
        return round(avg, 1) if avg is not None else None


class ToddyShopDetailSerializer(serializers.ModelSerializer):
    place = PlaceReadSerializer(read_only=True)
    category = ShopCategorySerializer(read_only=True)
    status = StatusSerializer(read_only=True)
    owner = UserSerializer(read_only=True)
    facilities = FacilitySerializer(many=True, read_only=True)
    hygiene_tags = HygieneTagSerializer(many=True, read_only=True)
    license = ShopLicenseSerializer(read_only=True)
    shop_food_items = ShopFoodItemSerializer(many=True, read_only=True)
    media = ShopMediaSerializer(many=True, read_only=True)
    avg_rating = serializers.SerializerMethodField()
    ratings_breakdown = serializers.SerializerMethodField()
    review_count = serializers.IntegerField(source="reviews.count", read_only=True)

    class Meta:
        model = ToddyShop
        fields = [
            "id",
            "name",
            "description",
            "owner",
            "category",
            "place",
            "address",
            "phone",
            "email",
            "website",
            "status",
            "facilities",
            "hygiene_tags",
            "license",
            "shop_food_items",
            "media",
            "avg_rating",
            "ratings_breakdown",
            "review_count",
            "created_at",
            "updated_at",
        ]

    def get_avg_rating(self, obj):
        result = obj.ratings.aggregate(avg=Avg("score"))
        avg = result.get("avg")
        return round(avg, 1) if avg is not None else None

    def get_ratings_breakdown(self, obj):
        rows = obj.ratings.values("rating_type__name").annotate(avg=Avg("score"))
        return {r["rating_type__name"]: round(r["avg"], 1) for r in rows}


class ToddyShopWriteSerializer(serializers.ModelSerializer):
    facilities = serializers.PrimaryKeyRelatedField(
        queryset=Facility.objects.all(), many=True, required=False
    )
    hygiene_tags = serializers.PrimaryKeyRelatedField(
        queryset=HygieneTag.objects.all(), many=True, required=False
    )

    class Meta:
        model = ToddyShop
        fields = [
            "name",
            "description",
            "category",
            "place",
            "address",
            "phone",
            "email",
            "website",
            "facilities",
            "hygiene_tags",
        ]

    def create(self, validated_data):
        facilities = validated_data.pop("facilities", [])
        hygiene_tags = validated_data.pop("hygiene_tags", [])
        shop = ToddyShop.objects.create(**validated_data)
        shop.facilities.set(facilities)
        shop.hygiene_tags.set(hygiene_tags)
        return shop

    def update(self, instance, validated_data):
        facilities = validated_data.pop("facilities", None)
        hygiene_tags = validated_data.pop("hygiene_tags", None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        if facilities is not None:
            instance.facilities.set(facilities)
        if hygiene_tags is not None:
            instance.hygiene_tags.set(hygiene_tags)
        return instance
