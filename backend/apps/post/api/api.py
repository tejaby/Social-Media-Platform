# rest_framework
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.generics import ListAPIView

# serializers
from .serializers import PostSerializer

# models
from apps.post.models import Post


class PostViewset(viewsets.ModelViewSet):
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.filter(state=True)


class UserPostsListView(ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.filter(state=True)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset().filter(author=request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
