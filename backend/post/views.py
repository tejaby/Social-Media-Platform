# django

from django.contrib.auth import authenticate

# rest_framework

from rest_framework import viewsets, permissions, authentication, status
from rest_framework.response import Response
from rest_framework.decorators import action

# serializers

from .serializers import UserSerializer
from .serializers import PostSerializer

# models

from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import Post


class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAdminUser]

    @action(detail=False, methods=['post'], authentication_classes=[], permission_classes=[permissions.AllowAny])
    def create_user(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)
            response_data = {
                "message": "Usuario creado exitosamente",
                "token": token.key,
                "user": serializer.data,

            }
            return Response(response_data, status=201)
        return Response(serializer.errors, status=400)

    @action(detail=False, methods=['post'], authentication_classes=[], permission_classes=[permissions.AllowAny])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({
                "message": "Por favor, proporciona nombre de usuario y contraseña"
            }, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)
        if user is not None:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                "message": "Inicio de sesión exitoso",
                "token": token.key,
                "user": UserSerializer(user).data,
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                "message": "Credenciales inválidas"
            }, status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False, methods=['post'], authentication_classes=[authentication.TokenAuthentication], permission_classes=[permissions.IsAuthenticated])
    def logout(self, request):
        user = request.user
        if user.is_authenticated:
            token = Token.objects.get(user=user)
            token.delete()
            return Response({"message": "Sesión cerrada exitosamente"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "No se encontró ninguna sesión activa"}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'], authentication_classes=[authentication.TokenAuthentication], permission_classes=[permissions.IsAuthenticated])
    def validate_token(self, request):
        user = request.user
        return Response({
            "message": "Token válido",
            "user": UserSerializer(user).data,
        }, status=status.HTTP_200_OK)


class PostViewset(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['get'], authentication_classes=[authentication.TokenAuthentication], permission_classes=[permissions.IsAuthenticated])
    def user_posts(self, request):
        user = request.user
        posts = Post.objects.filter(author=user)
        serializer = PostSerializer(posts, many=True)

        data = serializer.data
        for post_data in data:
            if 'image' in post_data:
                post_data['image'] = request.build_absolute_uri(
                    post_data['image'])

        return Response(data, status=status.HTTP_200_OK)
