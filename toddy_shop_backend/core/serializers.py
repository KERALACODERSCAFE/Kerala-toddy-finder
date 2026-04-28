from rest_framework import serializers

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


class UserRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRole
        fields = ["id", "name"]


class UserSerializer(serializers.ModelSerializer):
    role = UserRoleSerializer(read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "phone", "role", "date_joined"]


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
