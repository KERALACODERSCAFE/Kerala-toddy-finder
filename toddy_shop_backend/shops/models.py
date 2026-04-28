from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

from core.models import (
    Facility,
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
)
from shared.models import TimeStampMixin


class ToddyShop(TimeStampMixin):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="shops")
    category = models.ForeignKey(ShopCategory, on_delete=models.PROTECT, related_name="shops")
    place = models.ForeignKey(Place, on_delete=models.PROTECT, related_name="shops")
    address = models.TextField()
    phone = models.CharField(max_length=15, blank=True)
    email = models.EmailField(blank=True)
    website = models.URLField(blank=True)
    status = models.ForeignKey(Status, on_delete=models.PROTECT, related_name="shops")
    facilities = models.ManyToManyField(Facility, blank=True, related_name="shops")
    hygiene_tags = models.ManyToManyField(HygieneTag, blank=True, related_name="shops")

    class Meta:
        db_table = "toddy_shops"
        ordering = ["-created_at"]

    def __str__(self):
        return self.name


class ShopLicense(models.Model):
    class LicenseStatus(models.TextChoices):
        ACTIVE = "active", "Active"
        EXPIRED = "expired", "Expired"
        UNKNOWN = "unknown", "Unknown"
        RESTRICTED = "restricted", "Restricted"

    shop = models.OneToOneField(ToddyShop, on_delete=models.CASCADE, related_name="license")
    license_type = models.ForeignKey(LicenseType, on_delete=models.PROTECT)
    license_number = models.CharField(max_length=100, unique=True)
    issued_date = models.DateField()
    expiry_date = models.DateField(db_index=True)
    license_status = models.CharField(
        max_length=20,
        choices=LicenseStatus.choices,
        default=LicenseStatus.UNKNOWN,
    )

    class Meta:
        db_table = "shop_licenses"

    def __str__(self):
        return f"{self.shop.name} – {self.license_number}"


class ShopFoodItem(models.Model):
    shop = models.ForeignKey(ToddyShop, on_delete=models.CASCADE, related_name="shop_food_items")
    food_item = models.ForeignKey(FoodItem, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    is_available = models.BooleanField(default=True)

    class Meta:
        db_table = "shop_food_items"
        unique_together = ("shop", "food_item")

    def __str__(self):
        return f"{self.shop.name} – {self.food_item.name}"


class ShopMedia(models.Model):
    shop = models.ForeignKey(ToddyShop, on_delete=models.CASCADE, related_name="media")
    media_type = models.ForeignKey(MediaType, on_delete=models.PROTECT)
    file = models.FileField(upload_to="shop_media/%Y/%m/")
    caption = models.CharField(max_length=255, blank=True)
    uploaded_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name="uploaded_media",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "shop_media"

    def __str__(self):
        return f"{self.shop.name} – {self.media_type.name}"


class ShopReview(TimeStampMixin):
    shop = models.ForeignKey(ToddyShop, on_delete=models.CASCADE, related_name="reviews")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reviews")
    category = models.ForeignKey(ReviewCategory, on_delete=models.PROTECT)
    title = models.CharField(max_length=200, blank=True)
    body = models.TextField()
    status = models.ForeignKey(Status, on_delete=models.PROTECT, related_name="reviews")

    class Meta:
        db_table = "shop_reviews"
        unique_together = ("shop", "user")  # one review per user per shop

    def __str__(self):
        return f"{self.user.username} on {self.shop.name}"


class ShopRating(models.Model):
    shop = models.ForeignKey(ToddyShop, on_delete=models.CASCADE, related_name="ratings")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="ratings")
    rating_type = models.ForeignKey(RatingType, on_delete=models.PROTECT)
    score = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)])
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "shop_ratings"
        unique_together = ("shop", "user", "rating_type")

    def __str__(self):
        return f"{self.user.username} – {self.shop.name} – {self.rating_type.name}: {self.score}"
