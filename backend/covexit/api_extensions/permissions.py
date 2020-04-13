from rest_framework.permissions import IsAuthenticatedOrReadOnly

from covexit.partner.models import Partner


class BelongsTo(IsAuthenticatedOrReadOnly):
    """
    Permission that checks if this object contains the user within users
    """
    def has_object_permission(self, request, view, obj: Partner):
        return obj.users.filter(pk=request.user.pk).exists()
