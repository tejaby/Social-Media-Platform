from django.urls import path

# routers
from apps.post.api.routers import router

from apps.post.api.api import UserPostsListView


urlpatterns = [
    path('post/user/', UserPostsListView.as_view(), name='user_post')
]

urlpatterns += router.urls
