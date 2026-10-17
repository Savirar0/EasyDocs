from django.db import models
from accounts.models import Company
from django.contrib.auth.models import User
import uuid


# Create your models here.
class Board(models.Model):

    class boardTypeChoices(models.TextChoices):
        primary = "PRIMARY","Primary"
        client = "CLIENT", "Client"
        custom = "CUSTOM", "Custom"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, unique=True, editable=False)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    board_type = models.CharField(max_length=20,choices=boardTypeChoices.choices, default=boardTypeChoices.primary)
    name = models.CharField(max_length=225, blank=True)




class Galaxy(models.Model):
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
    name = models.CharField(max_length=225, blank=True)
    x_position = models.DecimalField(max_digits=8, decimal_places=2, blank=False)
    y_position = models.DecimalField(max_digits=8, decimal_places=2, blank=False)
    width = models.DecimalField(max_digits=8, decimal_places=2, blank=False)
    height = models.DecimalField(max_digits=8, decimal_places=2, blank=False)


class Asset(models.Model):
    #Asset can only sit in a galaxy
    galaxy = models.ForeignKey(Galaxy, on_delete=models.CASCADE)
    title = models.CharField(max_length=500, blank=False)
    file = models.FileField(upload_to='assets/')
    x_position = models.DecimalField(max_digits=8, decimal_places=2, blank=False)
    y_position = models.DecimalField(max_digits=8, decimal_places=2, blank=False)
    uploaded_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)


