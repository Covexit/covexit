from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import ugettext_lazy as _

from . import models


class UserAccountAdmin(UserAdmin):
    fieldsets = (
        (None, {'fields': ('username', 'password', 'verified', 'verification_key')}),
        (_('Personal info'), {'fields': (
            'first_name', 'last_name', 'email', 'postcode', 'city', 'address',
            'phone',
        )}),
        (_('Permissions'), {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        }),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )


admin.site.register(models.UserAccount, UserAccountAdmin)
admin.site.register(models.MailingListEntry)
