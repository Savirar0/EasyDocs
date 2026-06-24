from django.db import models

# Create your models here.
class Company(models.Model):
    name = models.CharField(max_length=117, unique=True, help_text="Please enter your company name.")
    location = models.CharField( max_length=100, help_text="Your company office location.")
    mail = models.EmailField(unique=True, help_text="Your company mail.")