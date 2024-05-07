# rest_framework
from rest_framework import viewsets, permissions, authentication, status
from rest_framework.response import Response
from rest_framework.decorators import action

# serializers
from .serializers import PostSerializer

# models
from apps.post.models import Post


class PostViewset(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['get'], authentication_classes=[authentication.TokenAuthentication], permission_classes=[permissions.IsAuthenticated])
    def user_posts(self, request):
        user = request.user
        posts = Post.objects.filter(author=user)
        serializer = PostSerializer(posts, many=True)

        data = serializer.data
        for post_data in data:
            if 'image' in post_data:
                post_data['image'] = request.build_absolute_uri(
                    post_data['image'])

        return Response(data, status=status.HTTP_200_OK)
