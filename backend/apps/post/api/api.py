# rest_framework
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination

# serializers
from .serializers import PostSerializer

# models
from apps.post.models import Post


class CustomPagination(PageNumberPagination):
    page_size = 5


class PostViewset(viewsets.ModelViewSet):
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.filter(state=True).order_by('-created_at')


class UserPostsListView(ListAPIView):
    serializer_class = PostSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        return Post.objects.filter(state=True).filter(author=self.request.user).order_by('-created_at')

    # def list(self, request, *args, **kwargs):
    #     queryset = self.get_queryset().filter(author=request.user)
    #     serializer = self.get_serializer(queryset, many=True)
    #     return Response(serializer.data, status=status.HTTP_200_OK)
