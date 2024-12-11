from django.db import models

class Category(models.Model):
    category_name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    sort = models.IntegerField(default=0, blank=True, null=True)
    home_view = models.BooleanField(default=False, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True, blank=True, null=True)


    def __str__(self):
        return self.category_name
    
class Brand(models.Model):
    brand_name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True, blank=True, null=True)


    def __str__(self):
        return self.brand_name

class Model(models.Model):
    brandid = models.ForeignKey(Brand, on_delete=models.CASCADE, related_name='models')  # Many-to-one relationship with Brand
    model_name = models.CharField(max_length=100)  # Name of the model
    is_active = models.BooleanField(default=True)  # Active status
    created_at = models.DateTimeField(auto_now_add=True)  # Created timestamp
    modified_at = models.DateTimeField(auto_now=True, blank=True, null=True)  # Modified timestamp

    def __str__(self):
        return self.model_name


class Color(models.Model):
    color_name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True, blank=True, null=True)


    def __str__(self):
        return self.color_name

class SubCategory(models.Model):
    # ForeignKey establishes the relationship to the Category model
    categoryid = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='subcategories')
    subcategory_name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    def __str__(self):
        return self.subcategory_name

class ChildCategory(models.Model):
    categoryid = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='child_categories')  # Many to one with Category
    subcategoryid = models.ForeignKey(SubCategory, on_delete=models.CASCADE, related_name='child_categories')  # Many to one with SubCategory
    childcategory_name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    def __str__(self):
        return self.childcategory_name
    
class Size(models.Model):
    categoryid = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='sizes')  # Many to one with Category
    subcategoryid = models.ForeignKey(SubCategory, on_delete=models.CASCADE, related_name='sizes')  # Many to one with SubCategory
    childcategoryid = models.ForeignKey(ChildCategory, on_delete=models.CASCADE, related_name='sizes')  # Many to one with ChildCategory
    size_name = models.CharField(max_length=30)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    def __str__(self):
        return self.size_name
