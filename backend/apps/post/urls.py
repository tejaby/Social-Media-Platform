from django.urls import path

# routers
from apps.post.api.routers import router

from apps.post.api.api import UserPostsListView, UserPostsByUserListView


urlpatterns = [
    path('post/user/', UserPostsListView.as_view(), name='user_post'),
    path('post/user/<int:user_id>/',
         UserPostsByUserListView.as_view(), name='user_posts_list'),
]

urlpatterns += router.urls
