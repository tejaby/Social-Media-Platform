# rest_framework

from rest_framework import serializers

# models

from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name',
                  'username', 'password', 'date_joined']
        read_only_fields = ['date_joined']
