from django.urls import path
from covexit.account.api.views import RegisterView, VerifyView, \
    CustomAuthToken, AddToMailingListView


urlpatterns = [
    path("api-token-auth/", CustomAuthToken.as_view()),
    path("register/", RegisterView.as_view(), name="api-register"),
    # path("verify/<pk>/", VerifyView.as_view(), name="api-verify"),
    path("verify/<str:verify_type>/", VerifyView.as_view(), name="api-verify"),
    path("mailing-list/", AddToMailingListView.as_view(), name="api-mailing-list"),
]
