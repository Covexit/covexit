from django.urls import path
from oscarapi.urls import urlpatterns as oscarapi_urls

from covexit.api_extensions.views.admin.product import ProductImageAdminDetail

urlpatterns = oscarapi_urls + [
    path(
        "admin/products/<int:product_pk>/images/",
        ProductImageAdminDetail.as_view(),
        name="admin-product-image-detail",
    ),
]
