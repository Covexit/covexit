import random
import string

from django.conf import settings
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.core.exceptions import ValidationError
from django.core.mail import send_mail
from django.conf import settings

VERIFICATION_MESSAGE = _("""Thank you for signing up for Covexit!

To activate your account, please visit this link:
{}
""")

VERIFICATION_KEY_LENGTH = 30
# Note: this will have to be set up on the frontend:
VERIFICATION_URL = 'https://covexit.de/verify/'


def create_verification_link(user):
    return VERIFICATION_URL + user.profile.verification_key


def create_verification_key():
    """Return a random string."""
    return ''.join(random.choices(string.ascii_letters,
                                  k=VERIFICATION_KEY_LENGTH))


def send_verification_email(user):
    link = create_verification_link(user)
    send_mail(
        'Covexit Email Verification',
        VERIFICATION_MESSAGE.format(link),
        settings.DEFAULT_FROM_EMAIL,
        [user.email],
        fail_silently=False,
    )


def validate_true(value):
    if not value:
        raise ValidationError(_('Field must be True!'))


class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    address = models.CharField(_('Address'), max_length=500)
    zip_and_city = models.CharField(_('Zip and City'), max_length=200)
    phone = models.CharField(_('Phone'), max_length=45, default='')
    accepted_tos = models.BooleanField(_('Accepted ToS'),
                                       validators=[validate_true])
    accepted_privacy_policy = models.BooleanField(_('Accepted Privacy Policy'),
                                                  validators=[validate_true])
    verified = models.BooleanField(_('Email Verified'), default=False)
    verification_key = models.CharField(_('Verification Key'),
                                        max_length=VERIFICATION_KEY_LENGTH)


from django.contrib.auth.models import AbstractUser
class UserAccount(AbstractUser):
    pass
