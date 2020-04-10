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
        profile = baker.make('Profile', user__email='x@y.com')
        send_verification_email(profile.user)
        self.assertEqual(len(mail.outbox), 1)
        self.assertIn(create_verification_link(profile.user),
                      mail.outbox[0].body)

    def test_create_verification_link(self):
        key = 'mykey'
        profile = baker.make('Profile', verification_key=key)
        self.assertEqual(create_verification_link(profile.user),
                         VERIFICATION_URL + key)
