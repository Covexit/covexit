from django.contrib import admin

from .models import ProductCategory, Product


admin.site.register(ProductCategory)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["name", "updated", "company", "price", "stock", "category"]
    list_editable = ["category", "stock"]
    list_filter = ["company", "category"]
    date_hierarchy = "updated"
