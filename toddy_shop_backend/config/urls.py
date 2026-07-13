from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

admin.site.site_header = "Toddy Shop Administration"
admin.site.index_title = "Apps and Services"
admin.site.site_title = "Toddy Shop"


urlpatterns = [
    path("admin/", admin.site.urls),
    path(
        "api/v1/",
        include(
            [
                path("", include("core.urls"), name="core"),
                path("", include("shops.urls"), name="shops"),
            ]
        ),
    ),
    # API schema and interactive docs – available in all environments so
    # contributors and frontend developers can explore the API without
    # needing DEBUG=True locally.
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/docs/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path(
        "api/redoc/",
        SpectacularRedocView.as_view(url_name="schema"),
        name="redoc",
    ),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
