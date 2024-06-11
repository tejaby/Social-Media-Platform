from django.urls import path

# routers
from apps.post.api.routers import router

from apps.post.api.api import UserPostsListView, UserInactivePostsListView, UserPostsByUserListView, PostDeactivateAPIView, PostActivateAPIView, PostsFromFollowedUsersView, PostLikeAPIView, PostDislikeAPIView


urlpatterns = [
    path('post/user/', UserPostsListView.as_view(), name='user_post'),
    path('post/user/inactive/', UserInactivePostsListView.as_view(),
         name='user_inactive_post'),
    path('post/user/<str:username>/',
         UserPostsByUserListView.as_view(), name='user_posts_list'),
    path('post/deactivate/<int:pk>/', PostDeactivateAPIView.as_view(),
         name='post_deactivate'),
    path('post/activate/<int:pk>/',
         PostActivateAPIView.as_view(), name='post_activate'),
    path('post/followed_posts/',
         PostsFromFollowedUsersView.as_view(), name='followed_posts'),
    path('post/like/<int:pk>/', PostLikeAPIView.as_view(), name='post_like'),
    path('post/dislike/<int:pk>/',
         PostDislikeAPIView.as_view(), name='post_dislike'),
]

urlpatterns += router.urls
