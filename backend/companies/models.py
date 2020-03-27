from django.contrib.auth.models import User
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models
from django.utils.translation import gettext as _


class Company(models.Model):
    class Meta:
        verbose_name_plural = 'Companies'

    CLOTHES = 'CL', _('Clothes and shoes')
    ELECTRONICS = 'EC', _('Electronics')
    JEWELLERY = 'JW', _('Accessoires and Jewellery')
    BOOKS = 'BK', _('Books and Office')
    GARDEN = 'GD', _('Flowers, Garden and Animals')
    DRUGSTORE = 'DS', _('Drugstore and Beauy')
    TOYS = 'TS', _('Toys and Gifts')
    COFFEE = 'CF', _('Tea and Coffee')
    LIVING = 'LV', _('Household and Living')

    name_validator = UnicodeUsernameValidator()

    name = models.CharField(
        _('registered company name'),
        max_length=65,
        unique=True,
        help_text=_('65 characters or fewer. '
                    'Letters, digits and @/./+/-/_ only.'),
        validators=[name_validator],
        error_messages={
            'unique': _('A company with that name already exists.'),
        },
    )
    mail = models.EmailField(_('e-mail address'), max_length=80)
    street = models.CharField(_('street address'), max_length=60)
    city = models.CharField(_('city'), max_length=45)
    phone = models.CharField(_('phone'), max_length=45)
    zip = models.CharField(_('ZIP Code'), max_length=10)
    latitude = models.DecimalField(_('latitude'), max_digits=9,
                                   decimal_places=6)
    longitude = models.DecimalField(_('longitude'), max_digits=9,
                                    decimal_places=6)
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    industry = models.CharField(
        max_length=2,
        choices=[CLOTHES, ELECTRONICS, JEWELLERY, BOOKS, GARDEN, DRUGSTORE,
                 TOYS, COFFEE, LIVING],
        default='CL',
    )
