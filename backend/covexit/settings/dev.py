"""
Django settings for covexit project.
"""

import os

from .base import *

SECRET_KEY = 'pc23$c6=qt5t2a9v8yatrb16_rkk&f45_6smrzckvxsdt0z*85'
DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

CORS_ORIGIN_ALLOW_ALL = True
