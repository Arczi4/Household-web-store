from . import models
from rest_framework import serializers
from rest_framework.fields import CharField, EmailField
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token

User = get_user_model()


class ContactSerializer(serializers.ModelSerializer):
    name = CharField(source="title", required=True)
    message = CharField(source="description", required=True)
    email = EmailField(required=True)

    class Meta:
        model = models.Contact
        fields = ("name", "email", "message")


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "password")  # Include any additional fields here
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        # token = Token.objects.create(user=user)
        
        return user
