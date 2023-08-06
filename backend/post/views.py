# rest_framework

from rest_framework import viewsets, permissions

# serializers

from .serializers import UserSerializer

# models

from django.contrib.auth.models import User


class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = {permissions.AllowAny}

    def perform_create(self, serializer):
        user = serializer.save()
        # Cifrar la contraseña antes de guardar el usuario
        user.set_password(user.password)
        user.save()
