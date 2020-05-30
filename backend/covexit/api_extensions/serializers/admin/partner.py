from oscar.apps.partner.models import StockRecord
from oscarapi.serializers.admin.partner import AdminStockRecordSerializer \
    as _AdminStockRecordSerializer
from rest_framework import serializers
from django.utils.translation import ugettext_lazy as _


from covexit.partner.models import Partner


class AdminStockRecordSerializer(_AdminStockRecordSerializer):

    class Meta(_AdminStockRecordSerializer.Meta):
        validators = [
            serializers.UniqueTogetherValidator(
                queryset=StockRecord.objects.all(),
                fields=('partner', 'partner_sku'),
                message=_("Product number has already been used.")
            )
        ]
    partner = serializers.PrimaryKeyRelatedField(
        many=False, required=True, queryset=Partner.objects
    )

    price_excl_tax = serializers.DecimalField(decimal_places=2, max_digits=12,
                                              localize=True)

