from oscarapi.views.admin.product import ProductAdminList as _ProductAdminList

from covexit.api_extensions.permissions import BelongsTo


class ProductAdminList(_ProductAdminList):
    permission_classes = [BelongsTo]
