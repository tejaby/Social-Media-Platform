# rest_framework
from rest_framework import serializers

# serializers
from apps.user.api.serializers import UserSerializer

# models
from apps.post.models import Post


class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Post
        fields = '__all__'
        read_only_fields = ['created_at']

    def create(self, validated_data):
        validated_data['author'] = self.context['request'].user
        return super().create(validated_data)
