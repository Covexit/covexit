from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from covexit.account.api.views import RegisterView, VerifyView


urlpatterns = [
    path("api-token-auth/", obtain_auth_token),
    path("register/", RegisterView.as_view(), name="api-register"),
    # path("verify/<pk>/", VerifyView.as_view(), name="api-verify"),
    path("verify/", VerifyView.as_view(), name="api-verify"),
]
