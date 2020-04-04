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

    CLOTHES = 'CL', _('Clothes and shoes')
    ELECTRONICS = 'EC', _('Electronics')
    JEWELLERY = 'JW', _('Accessoires and Jewellery')
    BOOKS = 'BK', _('Books and Office')
    GARDEN = 'GD', _('Flowers, Garden and Animals')
    DRUGSTORE = 'DS', _('Drugstore and Beauy')
    TOYS = 'TS', _('Toys and Gifts')
    COFFEE = 'CF', _('Tea and Coffee')
    LIVING = 'LV', _('Household and Living')

    created = models.DateTimeField(_("Created"), auto_now_add=True)
    updated = models.DateTimeField(_("Last updated"), auto_now=True)

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

    industry = models.CharField(
        max_length=2,
        choices=[CLOTHES, ELECTRONICS, JEWELLERY, BOOKS, GARDEN, DRUGSTORE,
                 TOYS, COFFEE, LIVING],
        default='CL',
    )

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
