# django
from django.db import models

# models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    biography = models.TextField(max_length=150, blank=True, null=True)
    website = models.CharField(max_length=150, blank=True, null=True)
    profile_picture = models.ImageField(
        upload_to='profile_pictures/', blank=True, null=True)
