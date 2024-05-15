# rest_framework
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination

# serializers
from .serializers import PostSerializer

# models
from apps.post.models import Post
from apps.post.models import CustomUser


class CustomPagination(PageNumberPagination):
    page_size = 9


class PostViewset(viewsets.ModelViewSet):
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.filter(state=True).order_by('-created_at')


class UserPostsListView(ListAPIView):
    serializer_class = PostSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        return Post.objects.filter(state=True).filter(author=self.request.user).order_by('-created_at')


class UserPostsByUserListView(ListAPIView):
    serializer_class = PostSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        username = self.kwargs['username']
        user = CustomUser.objects.get(username=username)
        return Post.objects.filter(state=True, author=user).order_by('-created_at')
