# django

from django.urls import path, include

# routers

from .routers import router

urlpatterns = [
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]

urlpatterns += router.urls
