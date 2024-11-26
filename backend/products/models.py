from django.db import models
from core.models import Category, SubCategory, ChildCategory, Brand, Model, Color, Size
from backend.settings import AUTH_USER_MODEL
from django.core.exceptions import ValidationError

# Products Model

User = AUTH_USER_MODEL

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
    stock_quantity = models.IntegerField(default=0, null=True, blank=True)    # Manage Quantity
    guarantee = models.DateTimeField(null=True, blank=True)
    warranty = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return self.product_name

# Model for additional images of a product
class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='products/')
    alt_text = models.CharField(max_length=255, null=True, blank=True)  # Optional: alt text for accessibility

    def __str__(self):
        return f"{self.product.product_name} Image"
    

#Modal to manage orders

class UserOrder(models.Model):
    ORDER_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('partial', 'Partial Payment'),
        ('paid', 'Fully Paid'),
    ]
    DELIVERY_STATUS_COICES = [
        ('not delivered', 'Not Delivered'),
        ('delivered', 'Delivered'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
    payment_status = models.CharField(max_length=20, choices=ORDER_STATUS_CHOICES, default='pending')
    delivery_status = models.CharField(max_length=20, choices= DELIVERY_STATUS_COICES, default='not delivered')
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)

    def update_status(self):
        if self.amount_paid >= self.total_amount:
            self.status = 'paid'
        elif self.amount_paid > 0:
            self.status = 'partial'
        else:
            self.status = 'pending'
        self.save()

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"


class OrderItem(models.Model):
    order = models.ForeignKey(UserOrder, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Price at the time of order

    def save(self, *args, **kwargs):
        if self._state.adding:
            if self.quantity > self.product.stock_quantity:
                raise ValidationError(f"Not enough stock for {self.product.product_name}")
            self.product.stock_quantity -= self.quantity
            self.product.save()
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        # Revert stock when an order item is deleted
        self.product.stock_quantity += self.quantity
        self.product.save()
        super().delete(*args, **kwargs)

    @property
    def total_price(self):
        return self.quantity * self.price  # Total cost for this item

    def __str__(self):
        return f"{self.quantity} x {self.product.product_name}"

