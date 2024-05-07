"""
URL configuration for api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

# modules

from django.conf import settings
from django.conf.urls.static import static


from apps.authentication.views import CustomTokenObtainPairView, CustomTokenRefreshView, CustomTokenVerifyView, CustomLogoutView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('api/token/refresh/', CustomTokenRefreshView.as_view(), name='refresh'),
    path('api/token/verify/', CustomTokenVerifyView.as_view(), name='verify'),
    path('api/token/logout/', CustomLogoutView.as_view(), name='logout'),
    path('api/', include('apps.post.urls')),
    path('api/', include('apps.user.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
