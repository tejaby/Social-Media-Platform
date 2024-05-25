# rest_framework
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, DestroyAPIView, UpdateAPIView
from rest_framework.pagination import PageNumberPagination

# serializers
from .serializers import PostSerializer

# models
from apps.post.models import Post
from apps.post.models import CustomUser


class CustomPagination(PageNumberPagination):
    page_size = 9


"""
Vista basada en GenericViewSet para el listado, obtencion, crecion, actualizacion y eliminacion de posts

"""


class PostViewset(viewsets.ModelViewSet):
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.filter(state=True).order_by('-created_at')


"""
Vista basada en ListAPIView para listar los posts del usuario autenticado

"""


class UserPostsListView(ListAPIView):
    serializer_class = PostSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        return Post.objects.filter(state=True).filter(author=self.request.user).order_by('-created_at')


"""
Vista basada en ListAPIView para listar los posts de un usuario específico según el nombre de usuario

"""


class UserPostsByUserListView(ListAPIView):
    serializer_class = PostSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        username = self.kwargs['username']
        user = CustomUser.objects.get(username=username)
        return Post.objects.filter(state=True, author=user).order_by('-created_at')


"""
Vista basada en DestroyAPIView para desactivar un post específico

"""


class PostDeactivateAPIView(DestroyAPIView):
    model = Post
    serializer_class = PostSerializer

    def get_queryset(self):
        return self.model.objects.filter(state=True)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance is not None:
            instance.state = False
            instance.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({'error': 'user not found'}, status=status.HTTP_404_NOT_FOUND)


"""
Vista basada en UpdateAPIView para activar un post específico

"""


class PostActivateAPIView(UpdateAPIView):
    model = Post
    serializer_class = PostSerializer

    def get_queryset(self):
        return self.model.objects.filter(state=False)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance is not None:
            instance.state = True
            instance.save()
            return Response(status=status.HTTP_200_OK)
        return Response({'error': 'post not found'}, status=status.HTTP_404_NOT_FOUND)
