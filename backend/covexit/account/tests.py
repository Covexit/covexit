from django.conf import settings
from django.contrib.sites.models import Site
from django.test import TestCase
from django.core import mail
from covexit.account.models import (
    send_verification_email,
    create_verification_link,
    VERIFICATION_URL,
    MailingListEntry)

from model_bakery import baker


class AccountTests(TestCase):
    def test_send_verification_email(self):
        user = baker.make(settings.AUTH_USER_MODEL, email='x@y.com')
        entry = baker.make(MailingListEntry, email='x@y.com')
        send_verification_email(user)
        send_verification_email(entry)
        self.assertEqual(len(mail.outbox), 2)
        self.assertIn(create_verification_link(user), mail.outbox[0].body)
        self.assertIn(create_verification_link(entry), mail.outbox[1].body)

    def test_create_verification_link(self):
        key = 'mykey'
        user = baker.make(settings.AUTH_USER_MODEL, verification_key=key)
        test_string = '{}{}{}/{}/{}'.format(Site.objects.get_current().domain,
                                            VERIFICATION_URL,
                                            user.pk,
                                            user.verification_key,
                                            'signup')
        self.assertIn(test_string, create_verification_link(user))
