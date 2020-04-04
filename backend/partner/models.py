from django.db import models
from django.utils.translation import ugettext_lazy as _
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


from oscar.apps.partner.models import *  # noqa isort:skip
