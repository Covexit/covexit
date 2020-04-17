from oscarapi.views.checkout import OrderDetail as _OrderDetail
from rest_framework.response import Response


class OrderDetail(_OrderDetail):
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        # once this order has been viewed, mark it "read":
        if request.user == instance.user:
            instance.read = True
            instance.save()
        return Response(serializer.data)
