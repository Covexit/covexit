from django.contrib import admin

from .models import ProductCategory, Product


admin.site.register(Product)
admin.site.register(ProductCategory)
