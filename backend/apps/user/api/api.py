# rest_framework
from rest_framework import viewsets, status, generics
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from rest_framework_simplejwt.tokens import RefreshToken

# serializador para el listado y obtencion de usuarios.
from .serializers import UserListSerializer

# serializador para la creacion y actualizacion de usuarios.
from .serializers import UserSerializer

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
        print(refresh, access)

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
        instance.is_active = False
        instance.save()
        return Response({'message': 'Usuario eliminado con éxito'}, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        user_serializer = UserSerializer(
            instance, data=request.data, partial=True)
        user_serializer.is_valid(raise_exception=True)
        user_instance = user_serializer.save()
        serializer = self.get_serializer(user_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserListView(generics.ListAPIView):
    model = CustomUser
    serializer_class = UserListSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        query_params = self.request.query_params
        username = query_params.get('username', '')

        return self.model.objects.filter(username__startswith=username).filter(is_active=True)
