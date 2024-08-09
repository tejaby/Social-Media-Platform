# rest_framework
from rest_framework import viewsets, status, generics, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from rest_framework_simplejwt.tokens import RefreshToken

# serializador para el listado y obtencion de usuarios.
from .serializers import UserListSerializer

# serializador para la creacion y actualizacion de usuarios.
from .serializers import UserSerializer, UserPasswordSerializer

# models
from apps.user.models import CustomUser


class CustomPagination(PageNumberPagination):
    page_size = 3


"""
Vista basada en GenericViewSet para el listado, obtencion, crecion, actualizacion y eliminacion de usuarios

"""


class UserViewSet(viewsets.GenericViewSet):
    model = CustomUser
    serializer_class = UserListSerializer

    def get_queryset(self):
        return self.model.objects.filter(is_active=True)

    def get_all_users_queryset(self):
        return self.model.objects.all()

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        user_serializer = UserSerializer(data=request.data)
        user_serializer.is_valid(raise_exception=True)
        instance = user_serializer.save()
        serializer = self.get_serializer(instance)

        refresh = RefreshToken.for_user(instance)
        access = refresh.access_token

        return Response({'message': 'Usuario creado con éxito', 'token': {
            'refresh': str(refresh),
            'access': str(access)
        }, 'user': serializer.data}, status=status.HTTP_201_CREATED)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({'message': 'Usuario eliminado con éxito'}, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        user_serializer = UserSerializer(
            instance, data=request.data, partial=True)
        user_serializer.is_valid(raise_exception=True)
        user_instance = user_serializer.save()
        serializer = self.get_serializer(user_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'], url_path='deactivate')
    def deactivate(self, request, pk=None):
        instance = self.get_all_users_queryset().filter(pk=pk).first()
        if not instance:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        if not instance.is_active:
            return Response({'error': 'El usuario ya está deshabilitado'}, status=status.HTTP_400_BAD_REQUEST)

        instance.is_active = False
        instance.save()
        return Response({'message': 'Usuario deshabilitado con éxito'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'], url_path='activate')
    def activate(self, request, pk=None):
        instance = self.get_all_users_queryset().filter(pk=pk).first()
        if not instance:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        if instance.is_active:
            return Response({'error': 'El usuario ya está activo'}, status=status.HTTP_400_BAD_REQUEST)

        instance.is_active = True
        instance.save()
        return Response({'message': 'Usuario reactivado con éxito'}, status=status.HTTP_200_OK)


"""
Vista basada en ListAPIView para listar usuarios filtrados por parámetros de la URL

"""


class UserListView(generics.ListAPIView):
    model = CustomUser
    serializer_class = UserListSerializer
    pagination_class = CustomPagination
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        query_params = self.request.query_params
        username = query_params.get('username', '')

        return self.model.objects.filter(username__startswith=username).filter(is_active=True)


"""
Vista basada en UpdateAPIView para cambiar la contraseña del usuario autenticado

"""


class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = UserPasswordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            instance.set_password(
                serializer.validated_data.get("new_password"))
            instance.save()
            return Response({"message": "Contraseña actualizada correctamente."}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
