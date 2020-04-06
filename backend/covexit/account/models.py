from django.contrib.auth.models import User
from django.db import models
from django.utils.translation import ugettext_lazy as _


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    address = models.CharField(_('Address'), max_length=500)
    zip_or_city = models.CharField(_('Zip or City'), max_length=200)
    phone = models.CharField(_('Phone'), max_length=45, default='')
