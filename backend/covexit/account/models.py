import random
import string

from django.conf import settings
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import BaseUserManager, PermissionsMixin
from django.contrib.sites.models import Site
from django.core.exceptions import ValidationError
from django.core.mail import send_mail
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _


VERIFICATION_MESSAGE = {
    'signup': _("""Vielen Dank, dass du dich bei Covexit angemeldet hast.
Um dein Geschäft ins Internet bringen zu können, musst du als nächstes .

<a href="{}">E-Mail-Adresse bestätigen</a>

Wir freuen uns über deine Unterstützung!
Wenn Sie glauben, dass Sie diese E-Mail irrtümlich erhalten haben, können Sie
dies einfach ignorieren.
"""),
    'signup_text': _("""Vielen Dank, dass du dich bei Covexit angemeldet hast.
Um dein Geschäft ins Internet bringen zu können, musst du als nächstes .

E-Mail-Adresse bestätigen: {}

Wir freuen uns über deine Unterstützung!
Wenn Sie glauben, dass Sie diese E-Mail irrtümlich erhalten haben, können Sie
dies einfach ignorieren.
"""),

    'mailinglist_text': _("""Vielen Dank, dass du dich für Covexit interessiert.
Damit wir dir wichtige Informationen und Updates zusenden können, müssen wir
überprüfen, ob dies auch die richtige Email-Adresse ist.

E-Mail-Adresse bestätigen: {}

Wir freuen uns über deine Unterstützung!
Wenn Sie glauben, dass Sie diese E-Mail irrtümlich erhalten haben, können Sie
dies einfach ignorieren.
"""),
    'mailinglist': _("""Vielen Dank, dass du dich für Covexit interessiert.
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
    print(send_mail(
        'Covexit Email Verification',
        VERIFICATION_MESSAGE[verify_type + '_text'].format(link),
        settings.DEFAULT_FROM_EMAIL,
        [user.email],
        html_message=VERIFICATION_MESSAGE[verify_type].format(link),
        fail_silently=False,
    ))


def validate_true(value):
    if not value:
        raise ValidationError(_('Field must be True!'))


class UserAccountManager(BaseUserManager):
    def _create_user(self, email, password, address, city, postcode,
                     phone, accepted_tos, accepted_privacy_policy, **extra_fields):
        if not email:
            raise ValueError('The given email must be set')
        user = self.model(
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

    def create_user(self, email, password, address, city, postcode,
                    phone, accepted_tos, accepted_privacy_policy, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(
            email, password, address, city, postcode, phone,
            accepted_tos, accepted_privacy_policy, **extra_fields)

    def create_superuser(self, email, password, address, city, postcode,
                         phone, accepted_tos, accepted_privacy_policy, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self._create_user(email, password, address, city, postcode,
                                 phone, accepted_tos, accepted_privacy_policy, **extra_fields)


class UserAccount(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=150, blank=True)
    address = models.CharField(_('Address'), max_length=500)
    postcode = models.CharField(_('Postcode'), max_length=20)
    city = models.CharField(_('City'), max_length=200)
    email = models.EmailField(_('email address'), unique=True)
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
    is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_(
            'Designates whether the user can log into this admin site.'),
    )
    is_active = models.BooleanField(
        _('active'),
        default=True,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)
    verification_key = models.CharField(_('Verification Key'), blank=True,
                                        max_length=VERIFICATION_KEY_LENGTH)

    objects = UserAccountManager()
    REQUIRED_FIELDS = [  # used in the create_superuser management command
        "address",
        "postcode",
        "city",
        "phone",
        "accepted_tos",
        "accepted_privacy_policy",
    ]
    USERNAME_FIELD = 'email'


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
