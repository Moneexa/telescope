# Generated by Django 5.1.4 on 2025-01-11 09:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('properties', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='property',
            name='address',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='property',
            name='city',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='property',
            name='estimatedValue',
            field=models.FloatField(default=0.0),
        ),
        migrations.AlterField(
            model_name='property',
            name='latitude',
            field=models.FloatField(default=0.0),
        ),
        migrations.AlterField(
            model_name='property',
            name='longitude',
            field=models.FloatField(default=0.0),
        ),
        migrations.AlterField(
            model_name='property',
            name='name',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='property',
            name='noHandledRisks',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='property',
            name='noRelevantRisks',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='property',
            name='totalFinancialRisk',
            field=models.FloatField(default=0.0),
        ),
        migrations.AlterField(
            model_name='property',
            name='zipCode',
            field=models.TextField(default=''),
        ),
    ]
