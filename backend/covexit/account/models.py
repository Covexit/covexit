import hashlib
import random

from django.contrib.auth.models import User
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.core.exceptions import ValidationError
from django.core.mail import send_mail

VERIFICATION_MESSAGE = """Thanks for signing up for Covexit!

To activate your account, please visit this link:
{}
"""

def create_activation_key(user):
    """Cribbed from github.com/arpheno/django-rest-framework-registration"""
    salt_bytes = str(random.random()).encode('utf-8')
    salt = hashlib.sha1(salt_bytes).hexdigest()[:5]
    hash_input = (salt + user.username).encode('utf-8')
    return hashlib.sha1(hash_input).hexdigest()


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
