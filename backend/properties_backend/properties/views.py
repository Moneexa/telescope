from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from django.core.serializers import serialize
from django.utils.decorators import method_decorator
import json
from .models import Property

# 1. Get all properties
def get_all_properties(request):
    if request.method == "GET":
        properties = Property.objects.all()

        # Custom preprocessing to add 'coordinates'
        property_list = [
            {
                "id": str(property.id),
                "name": property.name,
                "address": property.address,
                "zipCode": property.zipCode,
                "city": property.city,
                "coordinates": {
                    "lat": property.latitude,
                    "lng": property.longitude,
                },
                "estimatedValue": property.estimatedValue,
                "noRelevantRisks": property.noRelevantRisks,
                "noHandledRisks": property.noHandledRisks,
                "totalFinancialRisk": property.totalFinancialRisk,
            }
            for property in properties
        ]

        return JsonResponse({"properties": property_list}, safe=False)
# 2. Get individual property
def get_property(request, property_id):
    if request.method == "GET":
        property_instance = get_object_or_404(Property, id=property_id)
        property_data = {
            'id': str(property_instance.id),
            'name': property_instance.name,
            'address': property_instance.address,
            'zipCode': property_instance.zipCode,
            'city': property_instance.city,
            'coordinates': {
                'lat': property_instance.latitude,
                'lng': property_instance.longitude,
            },
            'estimatedValue': property_instance.estimatedValue,
            'noRelevantRisks': property_instance.noRelevantRisks,
            'noHandledRisks': property_instance.noHandledRisks,
            'totalFinancialRisk': property_instance.totalFinancialRisk,
        }
        return JsonResponse(property_data)

# 3. Insert a new property
@csrf_exempt  # Disable CSRF for simplicity; not recommended for production without proper handling
def insert_property(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            property_instance = Property.objects.create(
                name=data.get('name'),
                address=data.get('address'),
                zipCode=data.get('zipCode'),
                city=data.get('city'),
                latitude=data.get('latitude'),
                longitude=data.get('longitude'),
                estimatedValue=data.get('estimatedValue'),
                noRelevantRisks=data.get('noRelevantRisks'),
                noHandledRisks=data.get('noHandledRisks'),
                totalFinancialRisk=data.get('totalFinancialRisk'),
            )
            return JsonResponse({'message': 'Property created successfully', 'id': str(property_instance.id)}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
