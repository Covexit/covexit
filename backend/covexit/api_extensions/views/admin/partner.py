from django.db.models import Q
from oscarapi.views.admin.partner import PartnerList as _PartnerList
from oscarapi.views.admin.partner import PartnerDetail as _PartnerDetail
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from covexit.api_extensions.permissions import BelongsTo


class PartnerList(_PartnerList):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        qs = super().get_queryset()
        if self.request.user and self.request.user.is_active:
            return qs.filter(Q(is_active=True) | Q(is_active=False,
                                                   users__exact=self.request.user.pk))
        return qs.filter(is_active=True)


class PartnerDetail(_PartnerDetail):
    permission_classes = (BelongsTo,)
