from rest_framework import serializers
from .models import User

class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = User 
        fields = ('pk', 'name', 'email', 'phone', 'registrationDate')