# rest_framework
from rest_framework.views import APIView
from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, DestroyAPIView, UpdateAPIView
from django.shortcuts import get_object_or_404

# serializers
from .serializers import PostSerializer

# paginations
from .pagination import CustomPagination

# models
from apps.post.models import Post
from apps.post.models import CustomUser
from apps.follow.models import Follow


"""
Vista basada en GenericViewSet para el listado, obtencion, crecion, actualizacion y eliminacion de posts

"""


class PostViewset(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Post.objects.filter(state=True, author__is_active=True).order_by('-created_at')

    def destroy(self, request, *args, **kwargs):
        instance = get_object_or_404(Post, pk=kwargs['pk'])
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


"""
Vista basada en ListAPIView para listar los posts del usuario autenticado

"""


class UserPostsListView(ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = CustomPagination

    def get_queryset(self):
        return Post.objects.filter(state=True).filter(author=self.request.user).order_by('-created_at')


"""
Vista basada en ListAPIView para listar los posts desactivados del usuario autenticado

"""


class UserInactivePostsListView(ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = CustomPagination

    def get_queryset(self):
        return Post.objects.filter(state=False).filter(author=self.request.user).order_by('-created_at')


"""
Vista basada en ListAPIView para listar los posts de un usuario específico según el nombre de usuario

"""


class UserPostsByUserListView(ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = CustomPagination

    def get_queryset(self):
        username = self.kwargs['username']
        user = get_object_or_404(CustomUser, username=username)
        return Post.objects.filter(state=True, author=user).order_by('-created_at')


"""
Vista basada en DestroyAPIView para desactivar un post específico

"""


class PostDeactivateAPIView(DestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Post.objects.filter(state=True)

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
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Post.objects.filter(state=False)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance is not None:
            instance.state = True
            instance.save()
            return Response(status=status.HTTP_200_OK)
        return Response({'error': 'post not found'}, status=status.HTTP_404_NOT_FOUND)


"""
Vista basada en ListAPIView para listar los posts de usuarios seguidos

"""


class PostsFromFollowedUsersView(ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = CustomPagination

    def get_queryset(self):
        followed_users = Follow.objects.filter(
            follower=self.request.user).values_list('followed', flat=True)
        return Post.objects.filter(state=True, author__is_active=True, author__in=followed_users).order_by('-created_at')


"""
Vista basada en APIView para agregar me gusta a post

"""


class PostLikeAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            post = Post.objects.get(pk=pk)
            if request.user in post.likes.all():
                return Response({"message": "Ya te ha gustado esta publicación"}, status=status.HTTP_400_BAD_REQUEST)
            post.likes.add(request.user)
            return Response({"message": "Like agregado"}, status=status.HTTP_200_OK)
        except Post.DoesNotExist:
            return Response({"error": "Post no encontrado"}, status=status.HTTP_404_NOT_FOUND)


"""
Vista basada en APIView para eliminar me gusta a post

"""


class PostDislikeAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            post = Post.objects.get(pk=pk)
            if request.user not in post.likes.all():
                return Response({"message": "Aún no te ha gustado esta publicación"}, status=status.HTTP_400_BAD_REQUEST)
            post.likes.remove(request.user)
            return Response({"message": "Like eliminado"}, status=status.HTTP_200_OK)
        except Post.DoesNotExist:
            return Response({"error": "Post no encontrado"}, status=status.HTTP_404_NOT_FOUND)
