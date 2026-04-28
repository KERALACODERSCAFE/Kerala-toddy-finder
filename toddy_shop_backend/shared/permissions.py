from rest_framework.permissions import SAFE_METHODS, BasePermission


class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_admin


class IsShopOwner(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_shop_owner


class IsAdminOrReadOnly(BasePermission):
    """Write access restricted to admins; anyone can read."""

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return request.user.is_authenticated and request.user.is_admin


class IsShopOwnerOrAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and (request.user.is_shop_owner or request.user.is_admin)
