from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_all_properties, name='get_all_properties'),
    path('<uuid:property_id>/', views.get_property, name='get_property'),
    path('new/', views.insert_property, name='insert_property'),
]
