# rest_framework
from rest_framework import serializers

# models
from rest_framework.authtoken.models import Token
from .models import CustomUser
from .models import Post


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name',
                  'username', 'password', 'email', 'date_joined', "profile_picture"]
        read_only_fields = ['date_joined']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)
        user.save()

        Token.objects.create(user=user)
        return user


class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer()

    class Meta:
        model = Post
        fields = '__all__'
        read_only_fields = ['created_at']

    def create(self, validated_data):
        validated_data['author'] = self.context['request'].user
        return super().create(validated_data)
