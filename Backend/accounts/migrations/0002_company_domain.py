# Generated manually to add the optional domain field introduced after 0001.

from django.db import migrations, models
import django.core.validators


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='company',
            name='domain',
            field=models.CharField(
                blank=True,
                help_text="Enter your official company domain (e.g., company.com).",
                max_length=256,
                null=True,
                unique=True,
                validators=[django.core.validators.RegexValidator(
                    message="Please enter a valid domain name (e.g., 'company.com'). Do not include http:// or https://",
                    regex=r'^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$',
                )],
            ),
        ),
    ]
