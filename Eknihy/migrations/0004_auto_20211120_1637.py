# Generated by Django 3.2.9 on 2021-11-20 15:37

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Eknihy', '0003_auto_20211120_1633'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='logo',
            field=models.ImageField(default='Logo.png', upload_to='books_covers', validators=[django.core.validators.FileExtensionValidator(['png', 'jpg'])]),
        ),
        migrations.AlterField(
            model_name='book',
            name='pdf',
            field=models.FileField(default='Book.pdf', upload_to='books', validators=[django.core.validators.FileExtensionValidator(['pdf'])]),
        ),
    ]
