from oscarapi.serializers.admin.partner import AdminStockRecordSerializer \
    as _AdminStockRecordSerializer
from rest_framework import serializers

from covexit.partner.models import Partner


class AdminStockRecordSerializer(_AdminStockRecordSerializer):
    partner = serializers.PrimaryKeyRelatedField(
        many=False, required=True, queryset=Partner.objects
    )

    price_excl_tax = serializers.DecimalField(decimal_places=2, max_digits=12,
                                               localize=True)

