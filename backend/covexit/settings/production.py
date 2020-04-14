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

EMAIL_HOST = os.environ['SMTP_HOST']
EMAIL_PORT = os.environ['SMTP_PORT']
EMAIL_HOST_USER = os.environ['SMTP_USER']
EMAIL_HOST_PASSWORD = os.environ['SMTP_PASS']
EMAIL_SSL_CERTFILE = os.environ['SMTP_SSL_CERT']
EMAIL_SSL_KEYFILE = os.environ['SMTP_SSL_KEY']
EMAIL_USE_SSL = True
