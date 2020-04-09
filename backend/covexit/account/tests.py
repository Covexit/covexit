from django.test import TestCase
from django.core import mail
from covexit.account.models import send_verification_email

from model_bakery import baker


class AccountTests(TestCase):

    def test_send_verification_email(self):
        user = baker.make('User')
        send_verification_email(user)
        self.assertEqual(len(mail.outbox), 1)
