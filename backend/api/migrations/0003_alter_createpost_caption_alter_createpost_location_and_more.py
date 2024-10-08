# Generated by Django 5.0.7 on 2024-09-15 10:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_createpost'),
    ]

    operations = [
        migrations.AlterField(
            model_name='createpost',
            name='caption',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='createpost',
            name='location',
            field=models.CharField(blank=True, max_length=250),
        ),
        migrations.AlterField(
            model_name='createpost',
            name='tags',
            field=models.CharField(blank=True, max_length=360),
        ),
    ]
