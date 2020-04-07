from django.contrib.auth.models import User
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.core.exceptions import ValidationError


def validate_true(value):
    if not value:
        raise ValidationError(_('Field must be True!'))


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    address = models.CharField(_('Address'), max_length=500)
    zip_and_city = models.CharField(_('Zip and City'), max_length=200)
    phone = models.CharField(_('Phone'), max_length=45, default='')
    accepted_tos = models.BooleanField(_('Accepted ToS'),
                                       validators=[validate_true])
    accepted_privacy_policy = models.BooleanField(_('Accepted Privacy Policy'),
                                                  validators=[validate_true])
