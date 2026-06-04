from rest_framework import serializers

from shops.models import ToddyShop

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
    UserFavorite,
    UserProfile,
    UserRole,
)


class UserRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRole
        fields = ["id", "name"]


class UserSerializer(serializers.ModelSerializer):
    role = UserRoleSerializer(read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "phone", "role", "date_joined"]
        read_only_fields = ["id", "username", "role", "date_joined"]


class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    email = serializers.EmailField(required=False, allow_blank=True)
    phone = serializers.CharField(required=False, allow_blank=True, max_length=15)
    first_name = serializers.CharField(required=False, allow_blank=True, max_length=150)
    last_name = serializers.CharField(required=False, allow_blank=True, max_length=150)
    preferred_district_name = serializers.CharField(source="preferred_district.name", read_only=True)
    avatar_url = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = [
            "id",
            "username",
            "email",
            "phone",
            "first_name",
            "last_name",
            "full_name",
            "bio",
            "avatar",
            "avatar_url",
            "location",
            "preferred_district",
            "preferred_district_name",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "username", "avatar_url", "created_at", "updated_at"]
        extra_kwargs = {
            "avatar": {"write_only": True, "required": False},
            "preferred_district": {"required": False, "allow_null": True},
        }

    def get_avatar_url(self, obj):
        request = self.context.get("request")
        if obj.avatar:
            return request.build_absolute_uri(obj.avatar.url) if request else obj.avatar.url
        return None

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["email"] = instance.user.email
        data["phone"] = instance.user.phone
        data["first_name"] = instance.user.first_name
        data["last_name"] = instance.user.last_name
        return data

    def create(self, validated_data):
        user = validated_data.pop("user")
        self._update_user_fields(user, validated_data)
        return UserProfile.objects.create(user=user, **validated_data)

    def update(self, instance, validated_data):
        self._update_user_fields(instance.user, validated_data)
        return super().update(instance, validated_data)

    def _update_user_fields(self, user, data):
        user_fields = {}
        for field in ("email", "phone", "first_name", "last_name"):
            if field in data:
                user_fields[field] = data.pop(field)
        if user_fields:
            for field, value in user_fields.items():
                setattr(user, field, value)
            user.save(update_fields=list(user_fields))


class ShopSummarySerializer(serializers.ModelSerializer):
    place_name = serializers.CharField(source="place.name", read_only=True)
    district_name = serializers.CharField(source="place.district.name", read_only=True)

    class Meta:
        model = ToddyShop
        fields = ["id", "name", "address", "place_name", "district_name"]


class UserFavoriteSerializer(serializers.ModelSerializer):
    shop = ShopSummarySerializer(read_only=True)
    shop_id = serializers.PrimaryKeyRelatedField(
        source="shop",
        queryset=ToddyShop.objects.filter(status__name="Active"),
        write_only=True,
    )

    class Meta:
        model = UserFavorite
        fields = ["id", "shop", "shop_id", "created_at", "updated_at"]
        read_only_fields = ["id", "shop", "created_at", "updated_at"]


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ["username", "password", "email", "phone"]
        extra_kwargs = {
            "email": {"required": False},
            "phone": {"required": False},
        }

    def create(self, validated_data):
        customer_role = UserRole.objects.filter(name="Customer").first()
        return User.objects.create_user(
            username=validated_data["username"],
            password=validated_data["password"],
            email=validated_data.get("email", ""),
            phone=validated_data.get("phone", ""),
            role=customer_role,
        )


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = ["id", "name"]


class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = District
        fields = ["id", "name"]


class PlaceSerializer(serializers.ModelSerializer):
    district_name = serializers.CharField(source="district.name", read_only=True)

    class Meta:
        model = Place
        fields = [
            "id",
            "name",
            "district",
            "district_name",
            "address",
            "latitude",
            "longitude",
        ]
        extra_kwargs = {"district": {"write_only": True}}


class PlaceReadSerializer(serializers.ModelSerializer):
    district = DistrictSerializer(read_only=True)

    class Meta:
        model = Place
        fields = ["id", "name", "district", "address", "latitude", "longitude"]


class ShopCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopCategory
        fields = ["id", "name"]


class FoodCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodCategory
        fields = ["id", "name"]


class FoodItemSerializer(serializers.ModelSerializer):
    food_category_name = serializers.CharField(source="food_category.name", read_only=True)

    class Meta:
        model = FoodItem
        fields = ["id", "name", "food_category", "food_category_name"]
        extra_kwargs = {"food_category": {"write_only": True}}


class FacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Facility
        fields = ["id", "name"]


class HygieneTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = HygieneTag
        fields = ["id", "name"]


class RatingTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = RatingType
        fields = ["id", "name"]


class MediaTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaType
        fields = ["id", "name"]


class LicenseTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LicenseType
        fields = ["id", "name"]


class ReviewCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewCategory
        fields = ["id", "name"]
