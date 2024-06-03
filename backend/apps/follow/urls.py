from django.urls import path

from apps.follow.views import FollowUserView, UnfollowUserView, IsFollowingView

urlpatterns = [
    path('follow/follow/<int:user_id>/',
         FollowUserView.as_view(), name='follow_user'),
    path('follow/unfollow/<int:user_id>/',
         UnfollowUserView.as_view(), name='unfollow_user'),
    path('follow/is_following/<int:user_id>/',
         IsFollowingView.as_view(), name='is_following'),

]
