import random
import string

from django.contrib.auth.models import User
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.core.exceptions import ValidationError
from django.core.mail import send_mail

VERIFICATION_MESSAGE = """Thanks for signing up for Covexit!

To activate your account, please visit this link:
{}
"""

VERIFICATION_KEY_LENGTH = 30


def create_verification_key():
    """Return a random string."""
    return ''.join(random.choices(string.ascii_letters,
                                  k=VERIFICATION_KEY_LENGTH))


def send_verification_email(user):
    link = create_verification_link(user)
    send_mail(
        'Subject here',
        VERIFICATION_MESSAGE.format(link),
        'from@example.com',
        ['chris@zullo.dev'],
        fail_silently=False,
    )


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
    verified = models.BooleanField(_('Email Verified'), default=False)
    verification_key = models.CharField(_('Verification Key'),
                                        max_length=VERIFICATION_KEY_LENGTH)
