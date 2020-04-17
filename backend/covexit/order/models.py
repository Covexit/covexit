from django.db import models
from django.utils.translation import ugettext_lazy as _

from oscar.apps.order.abstract_models import AbstractOrder


class Order(AbstractOrder):
    read = models.BooleanField(_("Order has been read"), default=False)


from oscar.apps.order.models import *  # noqa isort:skip
