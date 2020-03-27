from rest_framework import serializers
from .models import Company


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'name', 'mail', 'street', 'city', 'phone', 'zip',
                  'latitude', 'longitude', 'owner', 'industry', ]
