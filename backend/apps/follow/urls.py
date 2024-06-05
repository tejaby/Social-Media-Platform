from django.urls import path

from apps.follow.views import FollowUserView, UnfollowUserView, IsFollowingView, FollowersListView, FollowingListView

urlpatterns = [
    path('follow/follow/<int:user_id>/',
         FollowUserView.as_view(), name='follow_user'),
    path('follow/unfollow/<int:user_id>/',
         UnfollowUserView.as_view(), name='unfollow_user'),
    path('follow/is_following/<int:user_id>/',
         IsFollowingView.as_view(), name='is_following'),
    path('follow/followers/<int:user_id>/',
         FollowersListView.as_view(), name='followers_list'),
    path('follow/following/<int:user_id>/',
         FollowingListView.as_view(), name='following_list'),

]
