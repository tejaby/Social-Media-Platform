# rest_framework
from rest_framework import serializers

# models
from rest_framework.authtoken.models import Token
from apps.post.models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name',
                  'username', 'password', 'email', 'date_joined', "profile_picture", "biography", "website"]
        read_only_fields = ['date_joined']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)
        user.save()

        Token.objects.create(user=user)
        return user
