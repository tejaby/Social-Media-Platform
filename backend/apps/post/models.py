# django
from django.db import models

# models
from apps.user.models import CustomUser


class Post(models.Model):
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    content = models.TextField()
    image = models.ImageField(upload_to='posts/', )
    likes = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
