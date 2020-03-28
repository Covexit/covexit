from django.db import models

from django.utils.translation import ugettext_lazy as _


class ProductCategory(models.Model):
    """
    Useful to filter products by their features
    """

    name = models.CharField(_("name"), max_length=100, unique=True)

    class Meta:
        verbose_name = _("Product category")
        verbose_name_plural = _("Product categories")

    def __str__(self):
        return self.name


class Product(models.Model):
    """
    Main model to store product inforamation.
    """

    created = models.DateTimeField(_("created"), auto_now_add=True)
    updated = models.DateTimeField(_("last updated"), auto_now=True)

    name = models.CharField(_("name"), max_length=100)
    image = models.FileField(_("image"), upload_to="product-images", max_length=500)
    price = models.DecimalField(_("price"), max_digits=8, decimal_places=2)
    stock = models.PositiveIntegerField(_("in stock"), default=1)
    description = models.TextField(_("description"), blank=True)
    category = models.ForeignKey(
        ProductCategory, verbose_name=_("category"), on_delete=models.PROTECT
    )
    company = models.ForeignKey(
        "companies.Company", verbose_name=_("company"), on_delete=models.CASCADE
    )

    class Meta:
        verbose_name = _("Product")
        verbose_name_plural = _("Products")

    def __str__(self):
        return self.name
