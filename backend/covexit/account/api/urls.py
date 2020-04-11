from django.urls import path
from covexit.account.api.views import RegisterView
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path("register/", RegisterView.as_view(), name="api-register"),
    path("api-token-auth/", obtain_auth_token),
]
