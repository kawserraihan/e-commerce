from django.db import models
from core.models import Category, SubCategory, ChildCategory, Brand, Model, Color, Size

# Products Model

class Product(models.Model):
    PRODUCT_TYPE_CHOICES = [
        ('wholesale', 'Wholesale'),
        ('regular', 'Regular'),
        ('seller', 'Seller'),
    ]

    product_name = models.CharField(max_length=255)
    product_type = models.CharField(max_length=20, choices=PRODUCT_TYPE_CHOICES)
    product_description = models.TextField()
    product_code = models.CharField(max_length=100, unique=True)
    product_image = models.ImageField(upload_to='products/', null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    sub_category = models.ForeignKey(SubCategory, on_delete=models.CASCADE, related_name='products')
    child_category = models.ForeignKey(ChildCategory, on_delete=models.SET_NULL, null=True, blank=True)
    brand = models.ForeignKey(Brand, on_delete=models.SET_NULL, null=True, blank=True)
    model = models.ForeignKey(Model, on_delete=models.SET_NULL, null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    slug = models.SlugField(unique=True)
    colors = models.ManyToManyField(Color, blank=True, related_name='products')  # Many-to-many relationship for colors
    sizes = models.ManyToManyField(Size, blank=True, related_name='products')  # Many-to-many relationship for sizes
    guarantee = models.DateTimeField(null=True, blank=True)
    warranty = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return self.product_name


