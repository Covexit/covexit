from django.contrib import admin
from django.contrib.admin import ModelAdmin
from django.contrib.admin.utils import unquote
from django.contrib.auth.admin import UserAdmin
from django.http import Http404
from django.shortcuts import redirect
from django.urls import path
from django.utils.translation import ugettext_lazy as _

from . import models
from .models import send_verification_email


class VerificationModelMixin:
    def get_urls(self):
        return [
            path(
                '<id>/resend_verification/',
                self.admin_site.admin_view(self.resend_verification),
                name='auth_user_resend_verification',
            ),
        ] + super().get_urls()

    def resend_verification(self, request, id):
        user = self.get_object(request, unquote(id))
        if user is None:
            raise Http404(_('User does not exist'))

        send_verification_email(user)
        self.message_user(request, 'Email has been sent.')
        return redirect('../')


class UserAccountAdmin(VerificationModelMixin, UserAdmin):
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


class WaitingListAdmin(VerificationModelMixin, ModelAdmin):
    pass


admin.site.register(models.UserAccount, UserAccountAdmin)
admin.site.register(models.MailingListEntry, WaitingListAdmin)
