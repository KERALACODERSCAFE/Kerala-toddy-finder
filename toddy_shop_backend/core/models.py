from django.contrib.auth.models import AbstractUser
from django.db import models


class UserRole(models.Model):
    name = models.CharField(max_length=50, unique=True)

    class Meta:
        db_table = "user_roles"

    def __str__(self):
        return self.name


class User(AbstractUser):
    """
    Custom user model. SSO / OAuth fields are intentionally omitted
    and will be added in a future iteration.
    """

    role = models.ForeignKey(
        UserRole,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="users",
    )
    phone = models.CharField(max_length=15, blank=True)

    # email is already defined on AbstractUser (optional by default).
    # social_auth fields will be added when SSO is integrated.

    class Meta:
        db_table = "users"

    def __str__(self):
        return self.username

    @property
    def is_admin(self):
        return self.role is not None and self.role.name.lower() == "admin"

    @property
    def is_shop_owner(self):
        return self.role is not None and self.role.name.lower() == "shopowner"

    @property
    def is_customer(self):
        return self.role is not None and self.role.name.lower() == "customer"


class Status(models.Model):
    """Generic status lookup shared by shops and reviews."""

    name = models.CharField(max_length=50, unique=True)

    class Meta:
        db_table = "statuses"
        verbose_name_plural = "statuses"

    def __str__(self):
        return self.name


class District(models.Model):
    """All 14 revenue districts of Kerala. Seeded via fixture."""

    name = models.CharField(max_length=100, unique=True)

    class Meta:
        db_table = "districts"
        ordering = ["name"]

    def __str__(self):
        return self.name


class Place(models.Model):
    """Locality / town within a district. Lat/lon are optional."""

    name = models.CharField(max_length=100)
    district = models.ForeignKey(District, on_delete=models.CASCADE, related_name="places")
    address = models.TextField(blank=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)

    class Meta:
        db_table = "places"
        unique_together = ("name", "district")

    def __str__(self):
        return f"{self.name}, {self.district.name}"


class ShopCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        db_table = "shop_categories"
        verbose_name_plural = "shop categories"

    def __str__(self):
        return self.name


class FoodCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        db_table = "food_categories"
        verbose_name_plural = "food categories"

    def __str__(self):
        return self.name


class FoodItem(models.Model):
    name = models.CharField(max_length=100)
    food_category = models.ForeignKey(FoodCategory, on_delete=models.CASCADE, related_name="food_items")

    class Meta:
        db_table = "food_items"
        unique_together = ("name", "food_category")

    def __str__(self):
        return self.name


class Facility(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        db_table = "facilities"
        verbose_name_plural = "facilities"

    def __str__(self):
        return self.name


class HygieneTag(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        db_table = "hygiene_tags"

    def __str__(self):
        return self.name


class RatingType(models.Model):
    """Dimension rated on a 1–10 scale (e.g. Food Quality, Ambiance)."""

    name = models.CharField(max_length=100, unique=True)

    class Meta:
        db_table = "rating_types"

    def __str__(self):
        return self.name


class MediaType(models.Model):
    name = models.CharField(max_length=50, unique=True)

    class Meta:
        db_table = "media_types"

    def __str__(self):
        return self.name


class LicenseType(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        db_table = "license_types"

    def __str__(self):
        return self.name


class ReviewCategory(models.Model):
    """Review categories mirroring Google Maps (Food, Service, Atmosphere …)."""

    name = models.CharField(max_length=100, unique=True)

    class Meta:
        db_table = "review_categories"
        verbose_name_plural = "review categories"

    def __str__(self):
        return self.name
