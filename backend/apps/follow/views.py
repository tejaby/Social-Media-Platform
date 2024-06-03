# rest_framework
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

# models
from apps.user.models import CustomUser
from apps.follow.models import Follow


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
