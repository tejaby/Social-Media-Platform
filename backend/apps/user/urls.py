from django.urls import path

# routers
from apps.user.api.routers import router

from apps.user.api.api import UserListView, ChangePasswordView


urlpatterns = [
    path('user/list/', UserListView.as_view(), name='user-list'),
    path('user/change-password/', ChangePasswordView.as_view(), name='change-password/')
]

urlpatterns += router.urls
