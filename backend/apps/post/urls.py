from django.urls import path

# routers
from apps.post.api.routers import router

from apps.post.api.api import UserPostsListView, UserPostsByUserListView, PostDeactivateAPIView, PostActivateAPIView


urlpatterns = [
    path('post/user/', UserPostsListView.as_view(), name='user_post'),
    path('post/user/<str:username>/',
         UserPostsByUserListView.as_view(), name='user_posts_list'),
    path('post/deactivate/<int:pk>/', PostDeactivateAPIView.as_view(),
         name='post-deactivate'),
    path('post/activate/<int:pk>/',
         PostActivateAPIView.as_view(), name='post-activate')
]

urlpatterns += router.urls
