from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.utils import timezone
from django.core.mail import send_mail
from django.conf import settings
import random
import string
from products.models import Cart
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
            Cart.objects.create(user=user)
            # logger.info(f"User created successfully: {email}")
            return user
        except Exception as e:
            # logger.exception("Error in creating user")
            raise e

    # def create_superuser(self, email, password=None, **kwargs):
    #     user = self.create_user(email, password=password, **kwargs)
    #     user.is_staff = False
    #     user.is_superuser = False
    #     user.save(using=self._db)
    #     # logger.info(f"Superuser created successfully: {email}")
    #     return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    first_name= models.CharField(max_length=255)
    last_name= models.CharField(max_length=255)
    profile_image = models.FileField(upload_to='users/profiles', null=True, blank=True)
    phone= models.CharField(max_length=255, null=True, blank=True, unique=True)
    address = models.TextField(null=True, blank=True)
    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True, null=True)
    email = models.EmailField(max_length=255, unique=True)
    date_of_birth = models.DateField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    is_blocked = models.BooleanField(default=False)
    otp_attempts = models.IntegerField(default=0)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.email







# ---------------- Role ----------------

class Role(models.Model):
    name = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.name

class Menu(models.Model):
    name = models.CharField(max_length=50)
    link = models.CharField(max_length=100, blank=True, null=True)
    sort_order = models.IntegerField(default=0)
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='submenus')
    icon = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name
    
class Permission(models.Model):
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.role.name} - {self.menu.name}"
    




#--------------------------------------- PROFILE & ROLES --------------------------------


    
class UserRole(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    is_used = models.BooleanField(default=False)

    def __str__(self):
        return self.user


class SellerProfile(models.Model):
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE, related_name='seller_profile')
    nid_no = models.CharField(max_length=20)
    nid_front_image = models.FileField(upload_to='documents/nid/front', null=True, blank=True)
    nid_back_image = models.FileField(upload_to='documents/nid/back', null=True, blank=True)
    trade_license = models.CharField(max_length=100)
    trade_license_image = models.FileField(upload_to='documents/tradelicense', null=True, blank=True)
    store_name = models.CharField(max_length=255)
    store_logo = models.FileField(upload_to='store/logos', null=True, blank=True)
    store_email = models.EmailField(max_length=255)
    store_phone = models.CharField(max_length=20)
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('approved', 'Approved'), ('rejected', 'Rejected')], default='pending')

    def __str__(self):
        return f"Seller: {self.user.email} - {self.store_name}"


class DealerProfile(models.Model):
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE, related_name='dealer_profile')
    nid_no = models.CharField(max_length=20)
    nid_front_image = models.FileField(upload_to='documents/nid/front', null=True, blank=True)
    nid_back_image = models.FileField(upload_to='documents/nid/back', null=True, blank=True)
    trade_license = models.CharField(max_length=100)
    trade_license_image = models.FileField(upload_to='documents/tradelicense', null=True, blank=True)
    business_name = models.CharField(max_length=255)
    business_logo = models.FileField(upload_to='business/logos', null=True, blank=True)
    business_email = models.EmailField(max_length=255)
    business_phone = models.CharField(max_length=20)
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('approved', 'Approved'), ('rejected', 'Rejected')], default='pending')

    def __str__(self):
        return f"Dealer: {self.user.email} - {self.business_name}"
    



#-------------------------------------- OTP ---------------------------------------------

class OTP(models.Model):
    email = models.EmailField()
    otp_code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    expired_at = models.DateTimeField()

    def is_expired(self):
        return timezone.now() > self.expired_at

    @classmethod
    def generate_otp(cls, email):
        otp_code = ''.join(random.choices(string.digits, k=6))
        expired_at = timezone.now() + timezone.timedelta(minutes=5)  # OTP expires in 5 minutes
        otp = cls.objects.create(email=email, otp_code=otp_code, expired_at=expired_at)
        return otp

    @classmethod
    def send_otp(cls, email):
        otp = cls.generate_otp(email)
        # Send OTP email
        subject = "Your OTP Code For MS Mart Registration"
        message = f"Your OTP code is {otp.otp_code}. It will expire in 5 minutes."
        from_email = settings.DEFAULT_FROM_EMAIL
        send_mail(subject, message, from_email, [email])
        return otp

