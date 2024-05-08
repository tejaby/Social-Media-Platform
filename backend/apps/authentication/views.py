from django.contrib.auth import authenticate

# rest_framework
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

from rest_framework_simplejwt.views import TokenObtainPairView

# serializador para la obtencion de usuarios.
from apps.user.api.serializers import UserListSerializer

'''
Vista basada en TokenObtainPairView para la autenticacion de usuarios y creacion de tokens con simplejwt

'''


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        if not request.data.get('username') or not request.data.get('password'):
            return Response({'error': 'se requiere nombre de usuario y contraseña'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request=request,  username=request.data.get(
            'username'), password=request.data.get('password'))

        if user is None:
            return Response({'error': 'no se encontró ninguna cuenta activa con las credenciales proporcionadas'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user_serializer = UserListSerializer(user)

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
