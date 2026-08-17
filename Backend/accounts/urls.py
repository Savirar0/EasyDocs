from django.urls import path
from . import views

urlpatterns = [
    path('register-company/', views.register_company, name='register-company'),
    path('register-employee/', views.EmployeeRegistation.as_view(), name='register-employee'),
    path('company-employee-count/', views.CompanyEmployeesCount.as_view(), name='company-employee-count')
]