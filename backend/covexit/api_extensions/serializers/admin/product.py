from oscar.apps.catalogue.models import Product, ProductImage
from oscarapi.serializers.utils import OscarModelSerializer
from rest_framework import serializers


class ProductImageAdminSerializer(OscarModelSerializer):
    original = serializers.ImageField(required=True)
    product = serializers.PrimaryKeyRelatedField(
        write_only=True, required=False, queryset=Product.objects
    )

    class Meta:
        model = ProductImage
        fields = "__all__"
