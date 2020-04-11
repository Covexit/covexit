from oscarapi.views.admin.partner import PartnerList as _PartnerList
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class PartnerList(_PartnerList):
    permission_classes = (IsAuthenticatedOrReadOnly,)
