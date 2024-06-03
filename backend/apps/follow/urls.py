from django.urls import path

from apps.follow.views import FollowUserView, UnfollowUserView

urlpatterns = [
    path('follow/<int:user_id>/', FollowUserView.as_view(), name='follow_user'),
    path('unfollow/<int:user_id>/',
         UnfollowUserView.as_view(), name='unfollow_user'),

]
