from django.urls import path
from covexit.account.api.views import RegisterView, VerifyView


urlpatterns = [
    path("register/", RegisterView.as_view(), name="api-register"),
    # path("verify/<pk>/", VerifyView.as_view(), name="api-verify"),
    path("verify/", VerifyView.as_view(), name="api-verify"),
]
