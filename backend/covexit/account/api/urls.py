from django.urls import path
from .views import RegisterView, VerifyView, AddToWaitingListView, \
    CustomAuthToken

urlpatterns = [
    path("api-token-auth/", CustomAuthToken.as_view()),
    path("register/", RegisterView.as_view(), name="api-register"),
    # path("verify/<pk>/", VerifyView.as_view(), name="api-verify"),
    path("verify/<str:verify_type>/", VerifyView.as_view(), name="api-verify"),
    path("waiting-list/", AddToWaitingListView.as_view(), name="api-waiting-list"),
]
