from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import UserAccount

admin.site.register(UserAccount, UserAdmin)
