from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from . import models

admin.site.register(models.UserAccount, UserAdmin)
admin.site.register(models.WaitingListEntry)
