from os import getenv, path
from pathlib import Path
import dotenv
from django.core.management.utils import get_random_secret_key
import os
import pymysql

pymysql.install_as_MySQLdb()


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

dotenv_file = BASE_DIR / 'env.local'

if path.isfile(dotenv_file):
    dotenv.load_dotenv(dotenv_file)



# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
# SECRET_KEY = 'django-insecure-sbmp+jgr-mlz&1qvpx10u%s=ocqe$yi#v@hs8z^9*tlnojk7zf'
SECRET_KEY = 'django-insecure-sbmp+jgr-mlz&1qvpx10u%s=ocqe$yi#v@hs8z^9*tlnojk7zf'

# SECURITY WARNING: don't run with debug turned on in production!
# DEBUG = getenv('DEBUG', 'False') == 'True'
DEBUG = True

# ALLOWED_HOSTS = getenv("DJANGO_ALLOWED_HOSTS", "127.0.0.1,localhost").split(",")

ALLOWED_HOSTS = ["localhost", "127.0.0.1", "demoapi.anticbyte.com"]


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',
    'djoser',
    'users',
    'core',
    'products',
    'incentives',
    'site_settings',
    'payment_gateway',

]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

#----------------------------------    DATABASE MYSQL --------------------------------

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME' : 'anticbyt_ecommercedemo',
        'USER' : 'root',
        'PASSWORD' : '',
        'HOST' : 'localhost',     
        'PORT' : "3306",
        },
    }





# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'static'
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

REST_FRAMEWORK = {

    'DEFAULT_AUTHENTICATION_CLASSES':[
        'users.authentication.CustomJwtAuthentication',
    ],

    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny'
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10  # Set the default page size
    
}

DJOSER = {
    'PASSWORD_RESET_CONFIRM_URL': 'password-reset/{uid}/{token}',
    'SEND_ACTIVATION_EMAIL': False,
    'ACTIVATION_URL': 'activation/{uid}/{token}',
    'USER_CREATE_PASSWORD_RETYPE': True,
    'PASSWORD_RESET_CONFIRM_RETYPE': True,
    'TOKEN_MODEL' : None
}

AUTH_COOKIE = 'access'
AUTH_COOKIE_ACCESS_MAX_AGE = 60 * 60 * 24
AUTH_COOKIE_REFRESH_MAX_AGE = 60 * 60 * 24
AUTH_COOKIE_SECURE= getenv('AUTH_COOKIE_SECURE', 'True') == 'True'
AUTH_COOKIE_HTTP_ONLY= True
AUTH_COOKIE_PATH='/'
AUTH_COOKIE_SAMESITE='None'

CORS_ALLOW_ALL_ORIGINS = True  # Disable CORS policy for all origins
CORS_ALLOW_CREDENTIALS = True  # Optional if cookies or credentials are needed


# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AUTH_USER_MODEL = "users.UserAccount"

#------------------- EMAIL SENT SYSTEM ---------------------------

# EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
# # Looking to send emails in production? Check out our Email API/SMTP product!
# EMAIL_HOST = 'sandbox.smtp.mailtrap.io'
# EMAIL_HOST_USER = '012d6578d30b50'
# EMAIL_HOST_PASSWORD = '24963d0ee3b73c'
# EMAIL_PORT = '2525'
# OTP_ATTEMPTS= 5


BREVO_API_KEY = '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'

# SMTP Configuration for Brevo
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp-relay.brevo.com"
EMAIL_PORT = 587
EMAIL_HOST_USER = "830949001@smtp-brevo.com"
EMAIL_HOST_PASSWORD = "1CPYJhL4s8yv0Vxm"
EMAIL_USE_TLS = True
DEFAULT_FROM_EMAIL = "830949001@smtp-brevo.com"  # Set a default 'from' email address

# ----------------------Phone DEMO OTP TOKEN --------------------------

# SMS_API_TOKEN = '1234567890123456789'

# ----------------------Phone Live OTP TOKEN --------------------------

SMS_API_TOKEN = '118332345081736444708a0b31e394e3ec137ab6fbf38c547538a'


# Bkash Settings
BKASH_USERNAME = "01770618567"
BKASH_PASSWORD = "D7DaC<*E*eG"
BKASH_APP_KEY = "0vWQuCRGiUX7EPVjQDr0EUAYtc"
BKASH_APP_SECRET = "jcUNPBgbcqEDedNKdvE4G1cAK7D3hCjmJccNPZZBq96QIxxwAMEx"

# Bkash URLs
BKASH_GRANT_URL = "https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/token/grant"
BKASH_REFRESH_URL = "https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/token/refresh"
BKASH_CREATE_PAYMENT_URL = "https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/create"
BKASH_EXECUTE_PAYMENT_URL = "https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/execute"
BKASH_CALLBACK_URL = "https://msmart-production.vercel.app/cart"




# LOGGING = {
#     'version': 1,
#     'disable_existing_loggers': False,
#     'handlers': {
#         'console': {
#             'class': 'logging.StreamHandler',
#         },
#     },
#     'loggers': {
#         'django': {
#             'handlers': ['console'],
#             'level': 'DEBUG',
#         },
#     },
# }


# Q_CLUSTER = {
#     "name": "Django-Q",
#     "workers": 4,
#     "recycle": 500,
#     "timeout": 60,
#     "compress": True,
#     "save_limit": 250,
#     "queue_limit": 50,
#     "cpu_affinity": 1,
#     "label": "Django-Q",
#     "django_orm": "default",  # Use Django ORM as the broker
# }

