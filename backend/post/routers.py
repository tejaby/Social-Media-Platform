# rest_framework

from rest_framework import routers

# views

from .views import UserViewset

router = routers.DefaultRouter()

router.register(r'api/user', UserViewset, 'user')
