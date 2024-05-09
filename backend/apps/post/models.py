# django
from django.db import models

# models
from apps.base.models import BaseModel
from apps.user.models import CustomUser


class Post(BaseModel):
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    content = models.TextField()
    image = models.ImageField(upload_to='post_image/', )
    likes = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = 'Post'
        verbose_name_plural = 'Posts'
