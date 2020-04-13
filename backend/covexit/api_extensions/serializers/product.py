from oscarapi.serializers.product import PartnerSerializer as _PartnerSerializer
from rest_framework import serializers

from covexit.account.models import UserAccount
from covexit.partner.models import PartnerAddress, Partner


class AddressSerializer(serializers.ModelSerializer):
    is_main = serializers.ReadOnlyField()

    class Meta:
        model = PartnerAddress
        exclude = ['partner']


class PartnerSerializer(_PartnerSerializer):
    address = AddressSerializer(write_only=True)
    addresses = AddressSerializer(many=True, read_only=True)
    users = serializers.PrimaryKeyRelatedField(many=True, write_only=True,
                                               queryset=UserAccount.objects.all())
    id = serializers.IntegerField(read_only=True)

    def create(self, validated_data):
        address = validated_data.pop('address')
        owners = validated_data.pop('users', False)
        partner = Partner(**validated_data)
        # save so we can add users and addresses
        partner.save()
        # store owners
        if owners:
            partner.users.set(owners)
        # create covexit.partner with their main address
        partner.addresses.create(**address, is_main=True)
        return partner
