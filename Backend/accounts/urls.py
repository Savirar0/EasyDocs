from django.urls import path 
from . import views

urlpatterns = [
    path('register-company/', views.register_company, name='register-company'),
]