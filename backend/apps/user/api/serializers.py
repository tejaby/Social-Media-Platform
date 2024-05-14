# rest_framework
from rest_framework import serializers

# models
from apps.user.models import CustomUser

"""
Serializador para el listado y obtencion de usuarios.

"""


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'first_name',
                  'last_name', 'profile_picture', 'biography', 'website', 'date_joined']


"""
Serializador para la creacion y actualizacion de usuarios.

Se sobrescribe el método create para encriptar la contraseña utilizando el método set_password

"""


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password', 'first_name',
                  'last_name', 'profile_picture', 'biography', 'website']

    def create(self, validated_data):
        user = CustomUser(**validated_data)
        user.set_password(validated_data.get('password'))
        user.save()
        return user
