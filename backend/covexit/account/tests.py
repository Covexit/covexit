from django.conf import settings
from django.test import TestCase
from django.core import mail
from covexit.account.models import (
    send_verification_email,
    create_verification_link,
    VERIFICATION_URL,
)

from model_bakery import baker


class AccountTests(TestCase):
    def test_send_verification_email(self):
        user = baker.make(settings.AUTH_USER_MODEL, email='x@y.com')
        send_verification_email(user)
        self.assertEqual(len(mail.outbox), 1)
        self.assertIn(create_verification_link(user), mail.outbox[0].body)

    def test_create_verification_link(self):
        key = 'mykey'
        user = baker.make(settings.AUTH_USER_MODEL, verification_key=key)
        self.assertIn(VERIFICATION_URL + key, create_verification_link(user))
