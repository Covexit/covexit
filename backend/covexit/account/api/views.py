from django.conf import settings
from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.exceptions import MethodNotAllowed
from rest_framework.response import Response

from covexit.account.api.serializers import RegisterSerializer, \
    VerifySerializer, AddToWaitingListSerializer
from rest_framework import permissions
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView

from covexit.account.models import WaitingListEntry

UserAccount = get_user_model()


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

    model = UserAccount
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

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({'user': serializer.data,
                         'token': serializer.instance.auth_token.key},
                        status=status.HTTP_201_CREATED, headers=headers)


class AddToWaitingListView(CreateAPIView):
    """
    Api for adding an entry to the waiting list


    POST(name, email, accepted_privacy_policy: true):
    A entry to the waiting list will be added and asked to verify.
    """

    model = WaitingListEntry
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = AddToWaitingListSerializer


class VerifyView(APIView):
    """
    Api for verifying user emails.

    POST(user_id, verification_key):
    - Check the verification key against the one associated with the user.
    - If the key is correct, activate the user and set user.verified = True
    - If not, return an error
    """
    serializer_class = VerifySerializer

    def post(self, request, format=None):
        ser = self.serializer_class(data=request.data)
        if ser.is_valid():
            user = ser.instance
            user.is_active = True
            user.verified = True
            user.save()
            return Response("User verified")
        return Response(ser.errors, status=status.HTTP_401_UNAUTHORIZED)
