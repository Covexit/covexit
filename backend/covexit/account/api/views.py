from django.conf import settings
from rest_framework import status
from rest_framework.exceptions import MethodNotAllowed
from rest_framework.response import Response

from covexit.account.api.serializers import RegisterSerializer

from rest_framework import permissions
from rest_framework.generics import CreateAPIView
from django.contrib.auth.models import User


class RegisterView(CreateAPIView):
    """
    Api for registering new users.


    POST(username, password):
    1. A new user will be created.
    2. The anonymous user will be logged in as the new user.

    GET (enabled in DEBUG mode only):
    Get the details of the user.
    If more details are needed, use the ``OSCARAPI_USER_FIELDS`` setting to change
    the fields the ``UserSerializer`` will render.
    """

    model = User
    permission_classes = [
        permissions.AllowAny  # Or anon users can't register
    ]
    serializer_class = RegisterSerializer

    def get(self, request, format=None):
        if settings.DEBUG:
            if request.user.is_authenticated:
                ser = RegisterSerializer(request.user, many=False)
                return Response(ser.data)
            return Response(status=status.HTTP_204_NO_CONTENT)

        raise MethodNotAllowed("GET")
