from django.db import models

# models
from apps.user.models import CustomUser


class Follow(models.Model):
    follower = models.ForeignKey(
        CustomUser, related_name='following', on_delete=models.CASCADE)
    followed = models.ForeignKey(
        CustomUser, related_name='followers', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('follower', 'followed')
