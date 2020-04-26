from django.shortcuts import get_object_or_404
from oscar.apps.catalogue.models import Product
from rest_framework.permissions import IsAuthenticatedOrReadOnly, SAFE_METHODS

from covexit.partner.models import Partner


class BelongsTo(IsAuthenticatedOrReadOnly):
    """
    Permission that checks if this object contains the user within users
    """

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        if isinstance(obj, Partner):
            return obj.users.filter(pk=request.user.pk).exists()
        if isinstance(obj, Product):
            return obj.stockrecords\
                .filter(partner__users=request.user.pk).exists()

    def has_permission(self, request, view):
        if 'product_pk' in request.resolver_match.kwargs:
            return Partner.objects.filter(
                stockrecords__product_id__exact=
                request.resolver_match.kwargs['product_pk'],
                users__exact=request.user.pk
            ).exists()
        if 'stockrecords' in request.data:
            partner = get_object_or_404(
                Partner,
                pk=request.data['stockrecords'][0]['partner']
            )
            return partner.users.filter(pk=request.user.pk).exists()
        return super().has_permission(request, view)
