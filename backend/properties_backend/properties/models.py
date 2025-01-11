from django.db import models
import uuid

class Property(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, auto_created=True)
    name = models.TextField(default="", null=False)
    address= models.TextField(default="", null=False)
    zipCode = models.TextField(default="", null=False)
    city= models.TextField(default="", null=False)
    latitude = models.FloatField(default=0.0, null=False)
    longitude = models.FloatField(default=0.0, null=False)
    estimatedValue = models.FloatField(default=0.0, null=False)
    noRelevantRisks = models.IntegerField(default=0, null=False)
    noHandledRisks = models.IntegerField(default=0, null=False)
    totalFinancialRisk = models.FloatField(default=0.0, null=False)
    

    def __str__(self):
        return self.name