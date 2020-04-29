from oscarapi.views.product import ProductList as _ProductList


class ProductList(_ProductList):

    def get_queryset(self):
        qs = super(ProductList, self).get_queryset()
        partner = self.request.query_params.get("partner")
        if partner is not None:
            return qs.filter(stockrecords__partner__exact=partner)

        return qs
