# rest_framework
from rest_framework import routers

# views
from .api import UserViewSet

router = routers.DefaultRouter()


router.register(r'user', UserViewSet, basename='user')
