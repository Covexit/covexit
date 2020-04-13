from django.db import models
from django.utils.translation import ugettext_lazy as _
from oscar.apps.address.abstract_models import AbstractPartnerAddress
from oscar.apps.partner.abstract_models import AbstractPartner


class Partner(AbstractPartner):
    """
    Model to store company information
    """
    class Meta:
        verbose_name = _('Company')
        verbose_name_plural = _('Companies')

    created = models.DateTimeField(_("Created"), auto_now_add=True)
    updated = models.DateTimeField(_("Last updated"), auto_now=True)
    image = models.CharField(max_length=50, blank=True, null=True, choices=[
        ('business_books.jpg', _('books')),
        ('business_clothes.jpg', _('clothes')),
        ('business_coffee.jpg', _('coffee')),
        ('business_drugstore.jpg', _('drugstore')),
        ('business_electronics.jpg', _('electronics')),
        ('business_garden.jpg', _('garden')),
        ('business_jewellry.jpg', _('jewellry')),
        ('business_living.jpg', _('living')),
        ('business_other.jpg', _('other')),
        ('business_toys.jpg', _('toys'))
    ])

    name = models.CharField(
        _('registered company name'),
        max_length=65,
        unique=True,
        help_text=_('65 characters or fewer. '
                    'Letters, digits and @/./+/-/_ only.'),
        error_messages={
            'unique': _('A company with that name already exists.'),
        },
    )

    description = models.TextField(_('description'), max_length=300, blank=True)

    def __str__(self):
        return self.name


class PartnerAddress(AbstractPartnerAddress):
    class Meta:
        verbose_name = _('address')
        verbose_name_plural = _('addresses')

    is_main = models.BooleanField(_('is main address'), default=False)
    mail = models.EmailField(_('e-mail address'), max_length=80, default='')
    website = models.CharField(_('website'), max_length=80, blank=True,
                               null=True)
    phone = models.CharField(_('phone'), max_length=45, default='')
    latitude = models.DecimalField(_('latitude'), max_digits=9,
                                   decimal_places=6, default=0)
    longitude = models.DecimalField(_('longitude'), max_digits=9,
                                    decimal_places=6, default=0)


from oscar.apps.partner.models import *  # noqa isort:skip
