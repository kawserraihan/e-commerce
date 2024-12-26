from django.contrib import admin
from .models import Role, Menu, Permission, UserRole, UserAccount, SellerProfile, DealerProfile

# Register your models here.


admin.site.register(Role)
admin.site.register(Menu)
admin.site.register(Permission)
admin.site.register(UserRole)
admin.site.register(UserAccount)
admin.site.register(SellerProfile)
admin.site.register(DealerProfile)
