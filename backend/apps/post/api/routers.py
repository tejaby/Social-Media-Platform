# rest_framework
from rest_framework import routers

# views
from .api import PostViewset

router = routers.DefaultRouter()

router.register(r'posts', PostViewset, 'post')
