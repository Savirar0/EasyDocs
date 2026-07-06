from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer
from django.db import transaction
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import Company, UserProfile


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



@api_view(['POST'])
@permission_classes([AllowAny]) 
def register_company(request):
    data = request.data
    company_name = data.get('company_name')
    domain = data.get('domain')
    mail = data.get('mail')
    phone_number = data.get('phone_number')
    location = data.get('location')
    
    username = data.get('username')
    password = data.get('password')

    if not company_name or not username or not password:
        return Response(
            {"error": "Company Name, Username, and Password are required fields."}, 
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username is already taken."}, status=status.HTTP_400_BAD_REQUEST)
    
    if domain and Company.objects.filter(domain=domain).exists():
        return Response({"error": "A company with this domain already exists."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        with transaction.atomic():
            new_company = Company.objects.create(
                name=company_name,
                domain=domain,
                mail=mail,
                phone_number=phone_number,
                location=location
            )
            new_user = User.objects.create_user(
                username=username,
                password=password  
            )

            UserProfile.objects.create(
                user=new_user,
                company=new_company,
                role='MANAGEMENT' 
            )

        return Response(
            {"message": "Company and administration account registered successfully!"}, 
            status=status.HTTP_201_CREATED
        )

    except Exception as e:
        return Response(
            {"error": f"An error occurred during registration: {str(e)}"}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
