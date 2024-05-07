# rest_framework
from rest_framework import routers

# views
from .api import UserViewset

router = routers.DefaultRouter()

router.register(r'users', UserViewset, 'user')
