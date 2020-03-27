from .models import Company
from .serializers import CompanySerializer
from rest_framework import viewsets


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
