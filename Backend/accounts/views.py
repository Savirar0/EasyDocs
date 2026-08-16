from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer
from django.core.exceptions import ValidationError
from django.db import IntegrityError, transaction
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import Company, UserProfile
from rest_framework.views import APIView


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

    required_fields = {
        "Company name": company_name,
        "Email": mail,
        "Phone number": phone_number,
        "Location": location,
        "Username": username,
        "Password": password,
    }
    missing_fields = [name for name, value in required_fields.items() if not value]
    if missing_fields:
        return Response(
            {"error": f"{', '.join(missing_fields)} are required fields."},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username is already taken."}, status=status.HTTP_400_BAD_REQUEST)
    
    if domain and Company.objects.filter(domain=domain).exists():
        return Response({"error": "A company with this domain already exists."}, status=status.HTTP_400_BAD_REQUEST)

    if Company.objects.filter(mail=mail).exists():
        return Response({"error": "A company with this email already exists."}, status=status.HTTP_400_BAD_REQUEST)

    if Company.objects.filter(phone_number=phone_number).exists():
        return Response({"error": "A company with this phone number already exists."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        with transaction.atomic():
            new_company = Company.objects.create(
                name=company_name,
                username=username,
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

    except ValidationError as exc:
        return Response({"error": exc.message_dict}, status=status.HTTP_400_BAD_REQUEST)
    except IntegrityError:
        return Response({"error": "An account with those company details already exists."}, status=status.HTTP_400_BAD_REQUEST)
    except Exception:
        return Response(
            {"error": "An error occurred while registering the company."},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


class EmployeeRegistation(APIView):

    def post(self, request):
        data=request.data
        name = data.get('name')
        mail = data.get('mail')
        empId = data.get('empId')
        username = data.get('username')
        password = data.get('password')
        role = data.get('role')
        company = data.get('company')
        companyId = data.get('companyId')

        required_fields = {
            "Name": name,
            "Email": mail,
            "Employee Id": empId,
            "Username": username,
            "Password": password,
            "Role": role,
            "Company": company,
            "Company Id": companyId
        }
        missing_fields = [name for name, value in required_fields.items() if not value]
        if missing_fields:
            return Response(
                {"error": f"{', '.join(missing_fields)} are required fields."},
                status=status.HTTP_400_BAD_REQUEST
            )
    
        if User.objects.filter(username=username).exists():
            return Response({"error": "Username is already taken."}, status=status.HTTP_400_BAD_REQUEST)
    
        if UserProfile.objects.filter(mail=mail).exists():
            return Response({"error": "An email with this email already exists."}, status=status.HTTP_400_BAD_REQUEST)

        if request.user.userprofile.role != "MANAGEMENT":
            return Response({"error":"Should be management of the company to add company users."}, status=status.HTTP_400_BAD_REQUEST)
    
        try:
            with transaction.atomic():
                
                new_user = User.objects.create_user(
                    username=username,
                    password=password  
                )
    
                new_company_employee = UserProfile.objects.create(
                    name=name,
                    user=new_user,
                    empId=empId,
                    mail=mail,
                    role=role,
                    company=request.user.userprofile.company
                )
    
            return Response(
                {"message": "Company employee account registered successfully!"}, 
                status=status.HTTP_201_CREATED
            )
    
        except ValidationError as exc:
            return Response({"error": exc.message_dict}, status=status.HTTP_400_BAD_REQUEST)
        except IntegrityError:
            return Response({"error": "An account with those details already exists."}, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response(
                {"error": "An error occurred while registering the company employee."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
