from rest_framework import serializers
from .models import Role, Menu, Permission, UserRole, UserAccount, SellerProfile, DealerProfile

class MenuSerializer(serializers.ModelSerializer):
    submenus = serializers.SerializerMethodField()

    class Meta:
        model = Menu
        fields = ['id', 'name', 'link', 'sort_order', 'parent', 'submenus']

    def get_submenus(self, obj):
        submenus = obj.submenus.all().order_by('sort_order')
        return MenuSerializer(submenus, many=True).data
    
class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['id', 'name']

class UserAccountSerializer(serializers.ModelSerializer):
    roles = serializers.SerializerMethodField()

    class Meta:
        model = UserAccount
        fields = [
            'id', 'email', 'first_name', 'last_name', 'phone', 'address',
            'date_of_birth', 'is_active', 'is_staff', 'created_at', 'modified_at', 'roles'
        ]

    def get_roles(self, obj):
        # Fetch the roles directly from the Role model
        roles = Role.objects.filter(id__in=UserRole.objects.filter(user=obj).values_list('role_id', flat=True))
        return RoleSerializer(roles, many=True).data  # Use RoleSerializer for simplified role data


class UserRoleSerializer(serializers.ModelSerializer):
  
    class Meta:
        model = UserRole
        fields = ['user', 'role', 'is_used']

class UserRoleForRouteSerializer(serializers.ModelSerializer):
    role = RoleSerializer()
  
    class Meta:
        model = UserRole
        fields = ['role',]


class SellerProfileSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=UserAccount.objects.all())

    class Meta:
        model = SellerProfile
        fields = [
            'id', 'user', 'nid_no', 'nid_front_image', 'nid_back_image', 'trade_license',
            'trade_license_image', 'store_name', 'store_logo', 'store_email', 'store_phone', 'status'
        ]
    def to_internal_value(self, data):
        # Convert 'user' field from list to integer if necessary
        if isinstance(data.get('user'), list) and len(data['user']) == 1:
            data['user'] = data['user'][0]  # Extract the first value from the list
        return super().to_internal_value(data)


class DealerProfileSerializer(serializers.ModelSerializer):
    user = UserAccountSerializer()

    class Meta:
        model = DealerProfile
        fields = [
            'id', 'user', 'nid_no', 'nid_front_image', 'nid_back_image', 'trade_license',
            'trade_license_image', 'business_name', 'business_logo', 'business_email', 'business_phone', 'status'
        ]
