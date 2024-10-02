from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
# import logging

# logger = logging.getLogger(__name__)


class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **kwargs):
        if not email:
            # logger.error("Failed to create user: Email is required.")
            raise ValueError("Users must have an email address")
        
        email = self.normalize_email(email).lower()

        user = self.model(email=email, **kwargs)

        try:
            user.set_password(password)
            user.save(using=self._db)
            # logger.info(f"User created successfully: {email}")
            return user
        except Exception as e:
            # logger.exception("Error in creating user")
            raise e

    def create_superuser(self, email, password=None, **kwargs):
        user = self.create_user(email, password=password, **kwargs)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        # logger.info(f"Superuser created successfully: {email}")
        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    first_name= models.CharField(max_length=255)
    last_name= models.CharField(max_length=255)
    phone= models.CharField(max_length=255, null=True, blank=True)
    nid_no = models.CharField(max_length=20, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    trade_license = models.CharField(max_length=100, null=True, blank=True)
    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True, null=True)
    email = models.EmailField(max_length=255, unique=True)
    date_of_birth = models.DateField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)


    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.email
