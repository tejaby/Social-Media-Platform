from django.urls import path

# routers
from apps.user.api.routers import router

from apps.user.api.api import UserListView


urlpatterns = [
    path('user/list/', UserListView.as_view(), name='user-list'),
]

urlpatterns += router.urls
