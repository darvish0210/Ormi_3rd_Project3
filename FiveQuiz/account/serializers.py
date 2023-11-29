from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password']
    def create(self, validated_data):
        password = validated_data.get('password')
        email = validated_data.get('email')
        user = User.objects.create_user(email=email,password=password)
        return user
