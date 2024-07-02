# rest_framework
from django.contrib.auth import authenticate
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


"""
Serializer para la validacion de contraseña

Se valida si la contraseña anterior es correcto usando el metodo authenticate.
Se valida que la contraseña nueva sea diferente a la contraseña vieja.

"""


class UserPasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not authenticate(username=user.username, password=value):
            raise serializers.ValidationError("Contraseña actual incorrecta")
        return value

    def validate_new_password(self, value):
        old_password = self.initial_data.get('old_password')
        if old_password == value:
            raise serializers.ValidationError(
                "La nueva contraseña no puede ser igual a la antigua.")
        return value
