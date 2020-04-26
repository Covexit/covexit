from django.conf import settings
from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.exceptions import MethodNotAllowed
from rest_framework.response import Response

from covexit.account.api.serializers import RegisterSerializer, \
    VerifySerializer, AddToMailingListSerializer
from rest_framework import permissions
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView

from covexit.account.models import MailingListEntry

UserAccount = get_user_model()


class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        if user.is_active:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user': {'id': user.pk, 'email': user.email}
            })
        return Response(status=status.HTTP_401_UNAUTHORIZED,
                        data="User not verified")


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


class AddToMailingListView(CreateAPIView):
    """
    Api for adding an entry to the mailing list


    POST(name, email, accepted_privacy_policy: true):
    A entry to the mailing list will be added and asked to verify.
    """

    model = MailingListEntry
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = AddToMailingListSerializer


class VerifyView(APIView):
    """
    Api for verifying user emails.

    POST(user_id, verification_key):
    - Check the verification key against the one associated with the instance.
    - If the key is correct, activate the instance and set instance.verified = True
    - If not, return an error
    """
    serializer_class = VerifySerializer

    def post(self, request, **kwargs):
        ser = self.serializer_class(data=request.data, context={'request': request})
        if ser.is_valid():
            instance = ser.instance
            instance.is_active = True
            instance.verified = True
            instance.save()
            return Response("Successfully verified")
        return Response(ser.errors, status=status.HTTP_401_UNAUTHORIZED)
