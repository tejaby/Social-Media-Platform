# rest_framework
from django.shortcuts import get_object_or_404
from rest_framework import status, permissions, generics
from rest_framework.views import APIView
from rest_framework.response import Response

# serializers
from apps.user.api.serializers import UserListSerializer

# models
from apps.user.models import CustomUser
from apps.follow.models import Follow


"""
Vista basada en APIView para seguir a un usuario

"""


class FollowUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, user_id):
        try:
            followed_user = CustomUser.objects.get(pk=user_id)
            if request.user == followed_user:
                return Response({"error": "No puedes seguirte a ti mismo"}, status=status.HTTP_400_BAD_REQUEST)
            Follow.objects.get_or_create(
                follower=request.user, followed=followed_user)
            return Response({"message": "Ahora siguiendo"}, status=status.HTTP_201_CREATED)
        except CustomUser.DoesNotExist:
            return Response({"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)


"""
Vista basada en APIView para dejar de seguir a un usuario

"""


class UnfollowUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, user_id):
        try:
            followed_user = CustomUser.objects.get(pk=user_id)
            Follow.objects.filter(follower=request.user,
                                  followed=followed_user).delete()
            return Response({"message": "Ya no te sigo"}, status=status.HTTP_204_NO_CONTENT)
        except CustomUser.DoesNotExist:
            return Response({"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)


"""
Vista basada en APIView para verificar el estado de seguimiento

"""


class IsFollowingView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_id):
        try:
            followed_user = CustomUser.objects.get(pk=user_id)
            is_following = Follow.objects.filter(
                follower=request.user, followed=followed_user).exists()
            return Response({"estas siguiendo": is_following}, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)


"""
Vista basada en ListAPIView para listar seguidores

"""


class FollowersListView(generics.ListAPIView):
    serializer_class = UserListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user = get_object_or_404(CustomUser, id=user_id)
        followers = Follow.objects.filter(
            followed=user).values_list('follower', flat=True)
        return CustomUser.objects.filter(id__in=followers)


"""
Vista basada en ListAPIView para listar seguidos

"""


class FollowingListView(generics.ListAPIView):
    serializer_class = UserListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user = get_object_or_404(CustomUser, id=user_id)
        following = Follow.objects.filter(
            follower=user).values_list('followed', flat=True)
        return CustomUser.objects.filter(id__in=following)
