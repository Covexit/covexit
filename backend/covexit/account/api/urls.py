from django.urls import path
from covexit.account.api.views import RegisterView


urlpatterns = [
    path("register/", RegisterView.as_view(), name="api-register"),
]
