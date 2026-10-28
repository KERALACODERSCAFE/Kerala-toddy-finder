from django.test import TestCase
from rest_framework.test import APIClient

from core.models import (
    District,
    Place,
    ReviewCategory,
    ShopCategory,
    Status,
    User,
    UserRole,
)
from shops.models import ShopReview, ToddyShop


class ShopReviewModerationTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.customer_role, _ = UserRole.objects.get_or_create(name="Customer")
        self.admin_role, _ = UserRole.objects.get_or_create(name="Admin")
        self.owner_role, _ = UserRole.objects.get_or_create(name="ShopOwner")

        self.pending_status, _ = Status.objects.get_or_create(name="Pending")
        self.published_status, _ = Status.objects.get_or_create(name="Published")
        self.active_status, _ = Status.objects.get_or_create(name="Active")

        self.district, _ = District.objects.get_or_create(name="Ernakulam")
        self.place, _ = Place.objects.get_or_create(name="Kochi", district=self.district, address="Kochi")
        self.shop_category, _ = ShopCategory.objects.get_or_create(name="Licensed Toddy Shop")
        self.review_category, _ = ReviewCategory.objects.get_or_create(name="Food Quality")

        self.owner = User.objects.create_user(
            username="shopowner",
            password="testpass123",
            role=self.owner_role,
        )
        self.customer = User.objects.create_user(
            username="reviewer",
            password="testpass123",
            role=self.customer_role,
        )
        self.other_user = User.objects.create_user(
            username="viewer",
            password="testpass123",
            role=self.customer_role,
        )
        self.admin = User.objects.create_user(
            username="adminuser",
            password="testpass123",
            role=self.admin_role,
        )

        self.shop = ToddyShop.objects.create(
            name="Backwater Toddy Shop",
            owner=self.owner,
            category=self.shop_category,
            place=self.place,
            address="Marine Drive",
            status=self.active_status,
        )
        self.reviews_url = f"/api/v1/shops/{self.shop.id}/reviews/"

    def test_newly_submitted_review_has_pending_status(self):
        self.client.force_authenticate(user=self.customer)
        payload = {
            "category": self.review_category.id,
            "title": "Authentic Toddy & Karimeen",
            "body": "Fresh toddy and delicious local dishes.",
        }
        response = self.client.post(self.reviews_url, payload, format="json")

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["data"]["status_detail"]["name"], "Pending")

        review = ShopReview.objects.get(shop=self.shop, user=self.customer)
        self.assertEqual(review.status, self.pending_status)
        self.assertEqual(review.status.name, "Pending")

    def test_pending_review_not_visible_to_public_but_visible_to_admin(self):
        review = ShopReview.objects.create(
            shop=self.shop,
            user=self.customer,
            category=self.review_category,
            title="Pending Review",
            body="Review waiting for moderation.",
            status=self.pending_status,
        )

        # Unauthenticated public request
        self.client.logout()
        response = self.client.get(self.reviews_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data["data"]), 0)

        # Authenticated non-admin request
        self.client.force_authenticate(user=self.other_user)
        response = self.client.get(self.reviews_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data["data"]), 0)

        # Admin request
        self.client.force_authenticate(user=self.admin)
        response = self.client.get(self.reviews_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data["data"]), 1)
        self.assertEqual(response.data["data"][0]["id"], review.id)
        self.assertEqual(response.data["data"][0]["status_detail"]["name"], "Pending")

    def test_review_visible_to_public_after_approval(self):
        review = ShopReview.objects.create(
            shop=self.shop,
            user=self.customer,
            category=self.review_category,
            title="Moderated Review",
            body="Review to be approved.",
            status=self.pending_status,
        )

        # Verify not visible publicly before approval
        self.client.logout()
        response = self.client.get(self.reviews_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data["data"]), 0)

        # Approve the review
        review.status = self.published_status
        review.save()

        # Public user can now see the approved review
        response = self.client.get(self.reviews_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data["data"]), 1)
        self.assertEqual(response.data["data"][0]["id"], review.id)
        self.assertEqual(response.data["data"][0]["status_detail"]["name"], "Published")

        # Admin user also sees the approved review
        self.client.force_authenticate(user=self.admin)
        response = self.client.get(self.reviews_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data["data"]), 1)
        self.assertEqual(response.data["data"][0]["id"], review.id)

    def test_pending_review_detail_access_restricted_to_author_and_admin(self):
        review = ShopReview.objects.create(
            shop=self.shop,
            user=self.customer,
            category=self.review_category,
            title="Pending Review Detail",
            body="Review detail waiting for moderation.",
            status=self.pending_status,
        )
        detail_url = f"/api/v1/shops/{self.shop.id}/reviews/{review.id}/"

        # Another authenticated user cannot retrieve pending review detail
        self.client.force_authenticate(user=self.other_user)
        response = self.client.get(detail_url)
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.data["status"], "error")

        # Review author can retrieve pending review detail
        self.client.force_authenticate(user=self.customer)
        response = self.client.get(detail_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["data"]["id"], review.id)
        self.assertEqual(response.data["data"]["status_detail"]["name"], "Pending")

        # Admin can retrieve pending review detail
        self.client.force_authenticate(user=self.admin)
        response = self.client.get(detail_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["data"]["id"], review.id)
        self.assertEqual(response.data["data"]["status_detail"]["name"], "Pending")

        # Once approved, other authenticated user can retrieve review detail
        review.status = self.published_status
        review.save()

        self.client.force_authenticate(user=self.other_user)
        response = self.client.get(detail_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["data"]["id"], review.id)
        self.assertEqual(response.data["data"]["status_detail"]["name"], "Published")
