from django.contrib.auth import authenticate

# rest_framework
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from django.contrib.auth.hashers import check_password

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

from rest_framework_simplejwt.views import TokenObtainPairView

# serializador para la obtencion de usuarios.
from apps.user.api.serializers import UserListSerializer

# models
from apps.user.models import CustomUser

'''
Vista basada en TokenObtainPairView para la autenticacion de usuarios y creacion de tokens con simplejwt

'''


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({'error': 'se requiere nombre de usuario y contraseña'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(username=username)
        except CustomUser.DoesNotExist:
            return Response({'error': 'No se encontró ninguna cuenta activa con las credenciales proporcionadas'},
                            status=status.HTTP_400_BAD_REQUEST)

        if not check_password(password, user.password):
            return Response({'error': 'La contraseña es incorrecta'}, status=status.HTTP_400_BAD_REQUEST)

        if not user.is_active:
            return Response({'error': 'La cuenta está desactivada. Por favor, contacta al administrador.', "id": user.id}, status=status.HTTP_403_FORBIDDEN)

        user = authenticate(
            request=request,  username=username, password=password)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user_serializer = UserListSerializer(
            user, context={'request': request})

        return Response({'message': 'inicio de sesión exitosamente', 'token': serializer.validated_data, 'user': user_serializer.data}, status=status.HTTP_200_OK)


'''
Vista basada en GenericAPIView para la validación del usuario y revocación del token de refresco.

'''


class CustomLogoutView(GenericAPIView):
    def post(self, request, *args, **kwargs):
        if not request.data.get('refresh'):
            return Response({'error': 'se requiere el token de actualización'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            token = RefreshToken(request.data.get('refresh'))
            token.blacklist()
            return Response({"message": "cierre de sesión exitoso"}, status=status.HTTP_200_OK)
        except TokenError:
            return Response({"error": "Token de refresco inválido"}, status=status.HTTP_400_BAD_REQUEST)
