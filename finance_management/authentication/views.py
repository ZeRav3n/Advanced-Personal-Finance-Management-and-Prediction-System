from django.shortcuts import render
from rest_framework import generics
from .serializers import UserRegistrationSerializer

# Create your views here.
class RegisterUserView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer