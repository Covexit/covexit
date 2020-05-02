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
    'mailinglist': _("""Vielen Dank, dass du Covexit beigetreten bist.
Damit wir dir wichtige Informationen und Updates zusenden können, müssen wir
überprüfen, ob dies auch die richtige Email-Adresse ist.

<a href="{}">E-Mail-Adresse bestätigen</a>

Wir freuen uns über deine Unterstützung!
Wenn Sie glauben, dass Sie diese E-Mail irrtümlich erhalten haben, können Sie
dies einfach ignorieren.
"""),
}

VERIFICATION_KEY_LENGTH = 30
# Note: this will have to be set up on the frontend:
VERIFICATION_URL = '/verify/'


def create_verification_link(user):
    verify_type = 'mailinglist' if isinstance(user, MailingListEntry) else 'signup'
    scheme = 'http' if settings.SITE_ID == 2 else 'https'
    return '{}://{}{}{}/{}/{}'.format(scheme,
                                 Site.objects.get_current().domain,
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
    def _create_user(self, username, email, password, address, city, postcode,
                     phone, accepted_tos, accepted_privacy_policy, **extra_fields):
        if not username:
            raise ValueError('The given username must be set')
        user = self.model(
            username=self.model.normalize_username(username),
            email=self.normalize_email(email),
            address=address,
            postcode=postcode,
            city=city,
            phone=phone,
            accepted_tos=accepted_tos,
            accepted_privacy_policy=accepted_privacy_policy,
            **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, email, password, address, city, postcode,
                    phone, accepted_tos, accepted_privacy_policy, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(
            username, email, password, address, city, postcode, phone,
            accepted_tos, accepted_privacy_policy, **extra_fields)

    def create_superuser(self, username, email, password, address, city, postcode,
                         phone, accepted_tos, accepted_privacy_policy, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self._create_user(username, email, password, address, city, postcode,
                                 phone, accepted_tos, accepted_privacy_policy, **extra_fields)


class UserAccount(AbstractUser):
    address = models.CharField(_('Address'), max_length=500)
    postcode = models.CharField(_('Postcode'), max_length=20)
    city = models.CharField(_('City'), max_length=200)
    phone = models.CharField(_('Phone'), max_length=45, default='')
    accepted_tos = models.BooleanField(_('Accepted ToS'),
                                       validators=[validate_true])
    accepted_privacy_policy = models.BooleanField(_('Accepted Privacy Policy'),
                                                  validators=[validate_true])
    verified = models.BooleanField(_('Email Verified'), default=False,
                                   help_text='<a href="../resend_verification">'
                                             'Send key again'
                                             '</a>'
                                   )
    verification_key = models.CharField(_('Verification Key'), blank=True,
                                        max_length=VERIFICATION_KEY_LENGTH)

    objects = UserAccountManager()
    REQUIRED_FIELDS = [  # used in the create_superuser management command
        "email",
        "address",
        "postcode",
        "city",
        "phone",
        "accepted_tos",
        "accepted_privacy_policy",
    ]


class MailingListEntry(models.Model):
    name = models.CharField(max_length=128)
    email = models.EmailField(unique=True)
    verified = models.BooleanField(_('Email Verified'), default=False,
                                   help_text='<a href="../resend_verification">'
                                             'Send key again'
                                             '</a>'
                                   )
    verification_key = models.CharField(_('Verification Key'), blank=True,
                                        max_length=VERIFICATION_KEY_LENGTH)
    accepted_privacy_policy = models.BooleanField(_('Accepted Privacy Policy'),
                                                  validators=[validate_true])
