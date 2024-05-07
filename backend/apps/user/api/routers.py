# rest_framework
from rest_framework import routers

# views
from .api import UserViewset, UserViewSets

router = routers.DefaultRouter()

router.register(r'users', UserViewset, 'user')
router.register(r'user', UserViewSets, basename='users')
