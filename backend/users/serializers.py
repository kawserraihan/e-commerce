from rest_framework import serializers
from .models import Role, Menu, Permission, UserRole, UserAccount

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
    class Meta:
        model = UserAccount
        fields = ['id', 'first_name', 'last_name', 'email', 'is_active', 'is_staff', 'is_superuser', 'nid_no', 'address', 'phone']
        read_only_fields = ['id', 'is_staff', 'is_superuser']


class UserRoleSerializer(serializers.ModelSerializer):
    role = RoleSerializer()

    class Meta:
        model = UserRole
        fields = ['user', 'role']