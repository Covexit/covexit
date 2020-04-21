from oscar.apps.catalogue.models import ProductImage, Product
from oscarapi.views.admin.product import ProductAdminList as _ProductAdminList, \
    ProductAdminDetail as _ProductAdminDetail
from rest_framework import generics
from rest_framework.exceptions import ParseError

from covexit.api_extensions.permissions import BelongsTo
from covexit.api_extensions.serializers.admin.product import \
    ProductImageAdminSerializer


class ProductAdminList(_ProductAdminList):
    permission_classes = [BelongsTo]


class ProductAdminDetail(_ProductAdminDetail):
    permission_classes = [BelongsTo]


class ProductImageAdminDetail(generics.ListCreateAPIView):
    permission_classes = [BelongsTo]
    queryset = ProductImage.objects
    serializer_class = ProductImageAdminSerializer

    def perform_create(self, serializer):
        if 'product_pk' not in serializer.context['request'].resolver_match.kwargs:
            raise ParseError("No primary key supplied")
        product = Product.objects.get(pk=serializer.context['request']
                                      .resolver_match.kwargs['product_pk'])
        serializer.save(product=product)
