from oscarapi.serializers.checkout import PriceSerializer as _PriceSerializer
from oscarapi.serializers.fields import TaxIncludedDecimalField
from rest_framework import serializers


class PriceSerializer(_PriceSerializer):
    excl_tax = serializers.DecimalField(decimal_places=2, max_digits=12,
                                        required=True, localize=True)
    incl_tax = TaxIncludedDecimalField(
        excl_tax_field="excl_tax", decimal_places=2, max_digits=12,
        required=False, localize=True
    )
    tax = TaxIncludedDecimalField(
        excl_tax_value="0.00", decimal_places=2, max_digits=12, required=False,
        localize=True
    )
