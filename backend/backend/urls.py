from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('djoser.urls')),
    path('api/', include('users.urls')),
    path('api/', include('core.urls')),
    path('api/', include('products.urls')),
    path('api/', include('incentives.urls')),
    path('api/', include('site_settings.urls')),
    # path('api/', include('payment_gateway.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
