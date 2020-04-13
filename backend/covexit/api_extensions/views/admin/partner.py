from oscarapi.views.admin.partner import PartnerList as _PartnerList
from oscarapi.views.admin.partner import PartnerDetail as _PartnerDetail
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from covexit.api_extensions.permissions import BelongsTo


class PartnerList(_PartnerList):
    permission_classes = (IsAuthenticatedOrReadOnly,)


class PartnerDetail(_PartnerDetail):
    permission_classes = (BelongsTo,)
