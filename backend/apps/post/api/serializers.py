# rest_framework
from rest_framework import serializers

# serializers
from apps.user.api.serializers import UserListSerializer

# models
from apps.post.models import Post

"""
Serializador para el listado, obtencion, creacion y actualizacion de posts

"""


class PostSerializer(serializers.ModelSerializer):
    author = UserListSerializer(read_only=True)
    likes = UserListSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = '__all__'

    def create(self, validated_data):
        validated_data['author'] = self.context['request'].user
        return super().create(validated_data)
