from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import User

# Create your models here.
class Company(models.Model):
    phone_validator = RegexValidator(
        regex=r'^\+?1?\d{9,13}$',
        message="Phone number must be entered in the format: '+999999999'. Up to 13 digits allowed."
    )
    domain_validator = RegexValidator(
        regex=r'^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$',
        message="Please enter a valid domain name (e.g., 'company.com'). Do not include http:// or https://"
    )
    name = models.CharField(max_length=117, help_text="Please enter your company name.")
    username = models.SlugField(max_length=99, unique=True, help_text="Enter an username associated with your company.")
    mail = models.EmailField(unique=True, help_text="Your company mail.") 
    phone_number = models.CharField(
        validators=[phone_validator], 
        max_length=17,
        unique=True,
        help_text="Enter an phone number associated with your company."
    )
    domain = models.CharField( max_length=256, unique=True, help_text="Enter your official company domain (e.g., company.com)." , null=True, blank=True, validators=[domain_validator])
    location = models.CharField( max_length=100, help_text="Your company office location.")

class UserProfile(models.Model):
    
    class role_choices(models.TextChoices):
        mng = "MANAGEMENT", "Management"
        emp = "EMPLOYEE", "Employee"

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=role_choices.choices)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
