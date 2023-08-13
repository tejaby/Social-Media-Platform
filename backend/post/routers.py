# rest_framework

from rest_framework import routers

# views

from .views import UserViewset, PostViewset

router = routers.DefaultRouter()

router.register(r'users', UserViewset, 'user')
router.register(r'posts', PostViewset, 'post')
