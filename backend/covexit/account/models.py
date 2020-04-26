import random
import string

from django.conf import settings
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.contrib.sites.models import Site
from django.core.exceptions import ValidationError
from django.core.mail import send_mail
from django.db import models
from django.utils.translation import ugettext_lazy as _


VERIFICATION_MESSAGE = {
    'signup': _("""Thank you for signing up for Covexit!

To activate your account, please visit this link:
{}
"""),
    'mailinglist': _("""Thank you for joining the mailing list for Covexit!

Please verify that you're the person who initiated this process by visiting
this link:
{}
"""),
}

VERIFICATION_KEY_LENGTH = 30
# Note: this will have to be set up on the frontend:
VERIFICATION_URL = '/verify/'


def create_verification_link(user):
    verify_type = 'mailinglist' if isinstance(user, MailingListEntry) else 'signup'
    return '{}{}{}/{}/{}'.format(Site.objects.get_current().domain,
                                 VERIFICATION_URL,
                                 user.pk,
                                 user.verification_key,
                                 verify_type)


def create_verification_key():
    """Return a random string."""
    return ''.join(random.choices(string.ascii_letters, k=VERIFICATION_KEY_LENGTH))


def send_verification_email(user):
    verify_type = 'mailinglist' if isinstance(user, MailingListEntry) else 'signup'
    link = create_verification_link(user)
    send_mail(
        'Covexit Email Verification',
        VERIFICATION_MESSAGE[verify_type].format(link),
        settings.DEFAULT_FROM_EMAIL,
        [user.email],
        fail_silently=False,
    )


def validate_true(value):
    if not value:
        raise ValidationError(_('Field must be True!'))


class UserAccountManager(BaseUserManager):
    def _create_user(self, username, email, password, address, zip_and_city,
                     phone, accepted_tos, accepted_privacy_policy, **extra_fields):
        if not username:
            raise ValueError('The given username must be set')
        user = self.model(
            username=self.model.normalize_username(username),
            email=self.normalize_email(email),
            address=address,
            zip_and_city=zip_and_city,
            phone=phone,
            accepted_tos=accepted_tos,
            accepted_privacy_policy=accepted_privacy_policy,
            **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, email, password, address, zip_and_city,
                    phone, accepted_tos, accepted_privacy_policy, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(
            username, email, password, address, zip_and_city, phone,
            accepted_tos, accepted_privacy_policy, **extra_fields)

    def create_superuser(self, username, email, password, address, zip_and_city,
                         phone, accepted_tos, accepted_privacy_policy, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self._create_user(username, email, password, address, zip_and_city,
                                 phone, accepted_tos, accepted_privacy_policy, **extra_fields)


class UserAccount(AbstractUser):
    address = models.CharField(_('Address'), max_length=500)
    zip_and_city = models.CharField(_('Zip and City'), max_length=200)
    phone = models.CharField(_('Phone'), max_length=45, default='')
    accepted_tos = models.BooleanField(_('Accepted ToS'),
                                       validators=[validate_true])
    accepted_privacy_policy = models.BooleanField(_('Accepted Privacy Policy'),
                                                  validators=[validate_true])
    verified = models.BooleanField(_('Email Verified'), default=False)
    verification_key = models.CharField(_('Verification Key'), blank=True,
                                        max_length=VERIFICATION_KEY_LENGTH)

    objects = UserAccountManager()
    REQUIRED_FIELDS = [  # used in the create_superuser management command
        "email",
        "address",
        "zip_and_city",
        "phone",
        "accepted_tos",
        "accepted_privacy_policy",
    ]


class MailingListEntry(models.Model):
    name = models.CharField(max_length=128)
    email = models.EmailField(unique=True)
    verified = models.BooleanField(_('Email Verified'), default=False)
    verification_key = models.CharField(_('Verification Key'), blank=True,
                                        max_length=VERIFICATION_KEY_LENGTH)
    accepted_privacy_policy = models.BooleanField(_('Accepted Privacy Policy'),
                                                  validators=[validate_true])
