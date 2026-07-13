from django.test import TestCase
from rest_framework.test import APIClient

from core.models import (
    District,
    Place,
    ShopCategory,
    Status,
    User,
    UserFavorite,
    UserProfile,
    UserRole,
)
from shops.models import ToddyShop


class UserDataAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.customer_role = UserRole.objects.create(name="Customer")
        self.owner_role = UserRole.objects.create(name="ShopOwner")
        self.active_status = Status.objects.create(name="Active")
        self.district = District.objects.create(name="Ernakulam")
        self.place = Place.objects.create(name="Kochi", district=self.district, address="Kochi")
        self.category = ShopCategory.objects.create(name="Licensed Toddy Shop")
        self.user = User.objects.create_user(
            username="customer",
            password="testpass123",
            role=self.customer_role,
        )
        self.other_user = User.objects.create_user(
            username="other",
            password="testpass123",
            role=self.customer_role,
        )
        self.owner = User.objects.create_user(
            username="owner",
            password="testpass123",
            role=self.owner_role,
        )
        self.shop = ToddyShop.objects.create(
            name="Backwater Toddy Shop",
            owner=self.owner,
            category=self.category,
            place=self.place,
            address="Marine Drive",
            status=self.active_status,
        )

    def authenticate(self, user=None):
        self.client.force_authenticate(user=user or self.user)

    def test_profile_patch_updates_profile_and_user_fields(self):
        self.authenticate()

        response = self.client.patch(
            "/api/v1/profile/",
            {
                "full_name": "Test Customer",
                "bio": "Toddy trail explorer",
                "location": "Kochi",
                "preferred_district": self.district.id,
                "email": "customer@example.com",
                "phone": "9876543210",
            },
            format="json",
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["data"]["full_name"], "Test Customer")
        profile = UserProfile.objects.get(user=self.user)
        self.user.refresh_from_db()
        self.assertEqual(profile.preferred_district, self.district)
        self.assertEqual(self.user.email, "customer@example.com")
        self.assertEqual(self.user.phone, "9876543210")

    def test_favorites_create_list_and_delete_are_scoped_to_user(self):
        UserFavorite.objects.create(user=self.other_user, shop=self.shop)
        self.authenticate()

        create_response = self.client.post(
            "/api/v1/favorites/",
            {"shop_id": self.shop.id},
            format="json",
        )
        duplicate_response = self.client.post(
            "/api/v1/favorites/",
            {"shop_id": self.shop.id},
            format="json",
        )
        list_response = self.client.get("/api/v1/favorites/")
        delete_response = self.client.delete(f"/api/v1/favorites/{self.shop.id}/")

        self.assertEqual(create_response.status_code, 201)
        self.assertEqual(duplicate_response.status_code, 200)
        self.assertEqual(list_response.status_code, 200)
        self.assertEqual(len(list_response.data["data"]), 1)
        self.assertEqual(delete_response.status_code, 200)
        self.assertFalse(UserFavorite.objects.filter(user=self.user, shop=self.shop).exists())
        self.assertTrue(UserFavorite.objects.filter(user=self.other_user, shop=self.shop).exists())

    def test_user_data_endpoints_require_authentication(self):
        response = self.client.get("/api/v1/profile/")

        self.assertEqual(response.status_code, 401)


class AuthFlowTests(TestCase):
    """Tests for the login → logout JWT blacklist flow and CORS header presence."""

    def setUp(self):
        self.client = APIClient()
        self.customer_role = UserRole.objects.create(name="Customer")
        self.user = User.objects.create_user(
            username="authuser",
            password="securepass123",
            role=self.customer_role,
        )

    def test_login_returns_access_and_refresh_tokens(self):
        response = self.client.post(
            "/api/v1/auth/login/",
            {"username": "authuser", "password": "securepass123"},
            format="json",
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn("access", response.data["data"])
        self.assertIn("refresh", response.data["data"])

    def test_logout_blacklists_refresh_token(self):
        # Step 1: login and get tokens
        login_resp = self.client.post(
            "/api/v1/auth/login/",
            {"username": "authuser", "password": "securepass123"},
            format="json",
        )
        access = login_resp.data["data"]["access"]
        refresh = login_resp.data["data"]["refresh"]

        # Step 2: logout — should succeed
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access}")
        logout_resp = self.client.post(
            "/api/v1/auth/logout/",
            {"refresh": refresh},
            format="json",
        )
        self.assertEqual(logout_resp.status_code, 200)

        # Step 3: try to use the blacklisted refresh token — should fail
        self.client.credentials()
        refresh_resp = self.client.post(
            "/api/v1/auth/token/refresh/",
            {"refresh": refresh},
            format="json",
        )
        self.assertEqual(refresh_resp.status_code, 401)

    def test_logout_without_refresh_token_returns_400(self):
        login_resp = self.client.post(
            "/api/v1/auth/login/",
            {"username": "authuser", "password": "securepass123"},
            format="json",
        )
        access = login_resp.data["data"]["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access}")

        response = self.client.post("/api/v1/auth/logout/", {}, format="json")
        self.assertEqual(response.status_code, 400)

    def test_logout_requires_authentication(self):
        response = self.client.post(
            "/api/v1/auth/logout/",
            {"refresh": "sometoken"},
            format="json",
        )
        self.assertEqual(response.status_code, 401)

    def test_cors_allow_all_origins_in_debug(self):
        """In DEBUG mode (test runner sets DEBUG=True) an arbitrary Origin should
        get an Access-Control-Allow-Origin response header."""
        response = self.client.get(
            "/api/v1/health/",
            HTTP_ORIGIN="http://localhost:3000",
        )
        self.assertIn("Access-Control-Allow-Origin", response)
