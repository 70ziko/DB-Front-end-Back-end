# Generated by Django 4.1.3 on 2023-01-14 15:36

from django.db import migrations

def create_data(apps, schema_editor):
    User = apps.get_model('kostka', 'User')
    User(name="Joe Silver", email="joe@email.com", phone="00000000").save()

class Migration(migrations.Migration):

    dependencies = [
        ('kostka', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_data),
    ]
