"""
Django settings for covexit project.
"""

import os

from .base import *

SECRET_KEY = os.environ['SECRET_KEY']
DEBUG = False

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'django',
        'USER': 'django',
        'PASSWORD': os.environ['POSTGRES_PW'],
        'HOST': 'localhost',
        'PORT': '',
    }
}

ALLOWED_HOSTS = ['covexit.de', '127.0.0.1']
