# rest_framework
from rest_framework import serializers

# serializers
from apps.user.api.serializers import UserListSerializer

# models
from apps.post.models import Post


class PostSerializer(serializers.ModelSerializer):
    author = UserListSerializer(read_only=True)

    class Meta:
        model = Post
        fields = '__all__'

    def create(self, validated_data):
        validated_data['author'] = self.context['request'].user
        return super().create(validated_data)
