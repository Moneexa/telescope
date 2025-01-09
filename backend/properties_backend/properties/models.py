from django.db import models
import uuid

class Property(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, auto_created=True)
    name = models.TextField(default="", null=True)
    address= models.TextField(default="", null=True)
    zipCode = models.TextField(default="", null=True)
    city= models.TextField(default="", null=True)
    latitude = models.FloatField(default=0.0, null=True)
    longitude = models.FloatField(default=0.0, null=True)
    estimatedValue = models.FloatField(default=0.0, null=True)
    noRelevantRisks = models.IntegerField(default=0, null=True)
    noHandledRisks = models.IntegerField(default=0, null=True)
    totalFinancialRisk = models.FloatField(default=0.0, null=True)
    

    def __str__(self):
        return self.name