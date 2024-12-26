from django.db import models

# Create your models here.
class Banner(models.Model):
    title = models.CharField(max_length=200, help_text="Title of the banner")
    image = models.FileField(upload_to='banners/', help_text="Upload banner image")
    link = models.URLField(blank=True, null=True, help_text="URL to redirect when banner is clicked")
    is_active = models.BooleanField(default=True, help_text="Is the banner currently active?")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
