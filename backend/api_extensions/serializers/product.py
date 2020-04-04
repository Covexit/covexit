from oscarapi.serializers.product import PartnerSerializer as _PartnerSerializer
from rest_framework.fields import ModelField
from rest_framework import serializers

from partner.models import PartnerAddress, Partner


class AddressSerializer(serializers.ModelSerializer):
    is_main = serializers.ReadOnlyField()

    class Meta:
        model = PartnerAddress
        exclude = ['partner']


class PartnerSerializer(_PartnerSerializer):
    address = AddressSerializer(write_only=True)
    addresses = AddressSerializer(many=True, read_only=True)

    def create(self, validated_data):
        address = validated_data.pop('address')
        owners = validated_data.pop('users')
        partner = Partner(**validated_data)
        # save so we can add users and addresses
        partner.save()
        # store owners
        partner.users.set(owners)
        # create partner with their main address
        partner.addresses.create(**address, is_main=True)
        return partner

