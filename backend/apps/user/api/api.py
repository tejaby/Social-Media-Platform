# django
from django.contrib.auth import authenticate

# rest_framework
from rest_framework import viewsets, permissions, authentication, status
from rest_framework.response import Response
from rest_framework.decorators import action

# serializers
from .serializers import UserSerializer

# serializadores para el listado y obtencion de usuarios
from .serializers import UserListSerializer

# serializadores para la creacion de usuarios
from .serializers import CustomUserSerializer

# models
from rest_framework.authtoken.models import Token
from apps.user.models import CustomUser


class UserViewset(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAdminUser]

    @action(detail=False, methods=['post'], authentication_classes=[], permission_classes=[permissions.AllowAny])
    def create_user(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)

            profile_picture = UserSerializer(user).data.get('profile_picture')
            if profile_picture:
                profile_picture_url = request.build_absolute_uri(
                    profile_picture)
            else:
                profile_picture_url = None

            response_data = {
                "message": "Usuario creado exitosamente",
                "token": token.key,
                "user": serializer.data,
                "profile_picture": profile_picture_url

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

            profile_picture = UserSerializer(user).data.get('profile_picture')
            if profile_picture:
                profile_picture_url = request.build_absolute_uri(
                    profile_picture)
            else:
                profile_picture_url = None

            return Response({
                "message": "Inicio de sesión exitoso",
                "token": token.key,
                "user": UserSerializer(user).data,
                "profile_picture": profile_picture_url
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

        profile_picture = UserSerializer(user).data.get('profile_picture')
        if profile_picture:
            profile_picture_url = request.build_absolute_uri(profile_picture)
        else:
            profile_picture_url = None

        return Response({
            "message": "Token válido",
            "user": UserSerializer(user).data,
            "profile_picture": profile_picture_url
        }, status=status.HTTP_200_OK)

    @action(detail=False, methods=['patch'], authentication_classes=[authentication.TokenAuthentication], permission_classes=[permissions.IsAuthenticated])
    def update_profile(self, request):
        user = self.request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()

            profile_picture = serializer.data.get('profile_picture')
            if profile_picture:
                profile_picture_url = request.build_absolute_uri(
                    profile_picture)
            else:
                profile_picture_url = None

            return Response({
                "message": "Perfil actualizado exitosamente",
                "user": serializer.data,
                "profile_picture": profile_picture_url,
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserViewSets(viewsets.GenericViewSet):
    model = CustomUser
    serializer_class = UserListSerializer

    def get_queryset(self):
        return self.model.objects.filter(is_active=True)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        user_serializer = CustomUserSerializer(data=request.data)
        user_serializer.is_valid(raise_exception=True)
        instance = user_serializer.save()
        serializer = self.get_serializer(instance)
        return Response({'message': 'Usuario creado con éxito', 'user': serializer.data}, status=status.HTTP_201_CREATED)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        instance.save()
        return Response({'message': 'Usuario eliminado con éxito'}, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        user_serializer = CustomUserSerializer(instance, data=request.data, partial=True)
        user_serializer.is_valid(raise_exception=True)
        user_instance = user_serializer.save()
        serializer = self.get_serializer(user_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)