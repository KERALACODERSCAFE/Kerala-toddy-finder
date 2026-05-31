import logging

from django.core.exceptions import ValidationError
from django.db import transaction
from import_export import fields, resources

from core.models import District, Facility, FoodItem, HygieneTag, LicenseType, Place, ShopCategory, Status, User

from .models import ShopFoodItem, ShopLicense, ToddyShop

logger = logging.getLogger(__name__)


class ToddyShopResource(resources.ModelResource):

    # EXPORT FIELDS
    facilities = fields.Field()
    hygiene_tags = fields.Field()
    license_type = fields.Field()
    license_number = fields.Field()
    issued_date = fields.Field()
    expiry_date = fields.Field()
    food_items = fields.Field()
    food_item_prices = fields.Field()
    food_item_availability = fields.Field()

    class Meta:
        model = ToddyShop
        fields = (
            "name",
            "owner",
            "description",
            "category",
            "place",
            "address",
            "phone",
            "email",
            "website",
            "status",
            "facilities",
            "hygiene_tags",
            "license_type",
            "license_number",
            "issued_date",
            "expiry_date",
            "food_items",
            "food_item_prices",
            "food_item_availability",
        )
        import_id_fields = ("name",)
        skip_unchanged = False
        report_skipped = True

    def _clean(self, val):
        return str(val).strip() if val else ""

    def _split(self, val):
        return [v.strip() for v in str(val).split("|") if v.strip()]

    def _bool(self, val):
        return str(val).lower() in ["true", "1", "yes"]

    # IMPORT

    def get_instance(self, instance_loader, row):
        try:
            district = District.objects.get(name=self._clean(row["district"]))
            place = Place.objects.get(name=self._clean(row["place_name"]), district=district)
            return ToddyShop.objects.get(name=self._clean(row["name"]), place=place)
        except Exception:
            return None

    def before_import_row(self, row, **kwargs):

        try:
            owner = User.objects.get(username=self._clean(row["owner"]))
            district = District.objects.get(name=self._clean(row["district"]))

            place, _ = Place.objects.get_or_create(
                name=self._clean(row["place_name"]),
                district=district,
            )

            category = ShopCategory.objects.get(name=self._clean(row["category"]))
            status = Status.objects.get(name=self._clean(row["status"]))

        except Exception as e:
            logger.error(f"[FK ERROR] {e}")
            raise ValidationError(str(e)) from e

        row["owner"] = owner.id
        row["place"] = place.id
        row["category"] = category.id
        row["status"] = status.id

    def after_save_instance(self, instance, row, **kwargs):
        if kwargs.get("dry_run"):
            return

        try:
            # FACILITIES
            names = self._split(row.get("facilities"))
            if names:
                objs = Facility.objects.filter(name__in=names)
                instance.facilities.set(objs)

            # HYGIENE
            names = self._split(row.get("hygiene_tags"))
            if names:
                objs = HygieneTag.objects.filter(name__in=names)
                instance.hygiene_tags.set(objs)

            # LICENSE
            if row.get("license_type"):
                lt = LicenseType.objects.get(name=self._clean(row["license_type"]))

                ShopLicense.objects.update_or_create(
                    shop=instance,
                    defaults={
                        "license_type": lt,
                        "license_number": self._clean(row.get("license_number")),
                        "issued_date": row.get("issued_date"),
                        "expiry_date": row.get("expiry_date"),
                    },
                )

            # FOOD ITEMS
            items = self._split(row.get("food_items"))
            prices = self._split(row.get("food_item_prices"))
            availability = self._split(row.get("food_item_availability"))

            if items:
                ShopFoodItem.objects.filter(shop=instance).delete()

                for i in range(len(items)):
                    food = FoodItem.objects.get(name=items[i])

                    ShopFoodItem.objects.create(
                        shop=instance,
                        food_item=food,
                        price=prices[i] if i < len(prices) else None,
                        is_available=self._bool(availability[i]) if i < len(availability) else True,
                    )

        except Exception as e:
            logger.error(f"[POST ERROR] {instance.name}: {e}")
            raise

    @transaction.atomic
    def import_data(self, *args, **kwargs):
        result = super().import_data(*args, **kwargs)
        return result

    # EXPORT

    def dehydrate_owner(self, obj):
        return obj.owner.username if obj.owner else ""

    def dehydrate_category(self, obj):
        return obj.category.name if obj.category else ""

    def dehydrate_place(self, obj):
        return obj.place.name if obj.place else ""

    def dehydrate_status(self, obj):
        return obj.status.name if obj.status else ""

    def dehydrate_facilities(self, obj):
        return "|".join(obj.facilities.values_list("name", flat=True))

    def dehydrate_hygiene_tags(self, obj):
        return "|".join(obj.hygiene_tags.values_list("name", flat=True))

    def dehydrate_license_type(self, obj):
        return obj.license.license_type.name if hasattr(obj, "license") and obj.license else ""

    def dehydrate_license_number(self, obj):
        return obj.license.license_number if hasattr(obj, "license") and obj.license else ""

    def dehydrate_issued_date(self, obj):
        return obj.license.issued_date if hasattr(obj, "license") and obj.license else ""

    def dehydrate_expiry_date(self, obj):
        return obj.license.expiry_date if hasattr(obj, "license") and obj.license else ""

    def dehydrate_food_items(self, obj):
        return "|".join(obj.shop_food_items.values_list("food_item__name", flat=True))

    def dehydrate_food_item_prices(self, obj):
        return "|".join([str(x.price or "") for x in obj.shop_food_items.all()])

    def dehydrate_food_item_availability(self, obj):
        return "|".join(["true" if x.is_available else "false" for x in obj.shop_food_items.all()])
