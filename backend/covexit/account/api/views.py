from django.conf import settings
from rest_framework import status
from rest_framework.exceptions import MethodNotAllowed
from rest_framework.response import Response

from covexit.account.api.serializers import RegisterSerializer, VerifySerializer
from rest_framework import permissions
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView


class RegisterView(CreateAPIView):
    """
    Api for registering new users.


    POST(username, password):
    1. A new user will be created.

    GET (enabled in DEBUG mode only):
    Get the details of the user.
    If more details are needed, use the ``OSCARAPI_USER_FIELDS`` setting to change
    the fields the ``UserSerializer`` will render.
    """

    model = settings.AUTH_USER_MODEL
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


class VerifyView(APIView):
    """
    Api for verifying user emails.

    POST(user_id, verification_key):
    - Check the verification key against the one in the user's profile.
    - If the key is correct, activate the user and set profile.verified = True
    - If not, return an error
    """
    serializer_class = VerifySerializer

    def post(self, request, format=None):
        ser = self.serializer_class(data=request.data)
        if ser.is_valid():
            user = ser.instance
            user.is_active = True
            user.profile.verified = True
            user.save()
            user.profile.save()
            return Response("User verified")
        return Response(ser.errors, status=status.HTTP_401_UNAUTHORIZED)
