# rest_framework
from rest_framework import serializers

# models
from apps.user.models import CustomUser


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'first_name',
                  'last_name', 'profile_picture', 'biography', 'website']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'

    def create(self, validated_data):
        user = CustomUser(**validated_data)
        user.set_password(validated_data.get('password'))
        user.save()
        return user
