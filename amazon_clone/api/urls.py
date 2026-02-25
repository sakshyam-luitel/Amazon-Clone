from django.urls import path
from . import views

urlpatterns = [
    path('products/' , views.products , name = 'products'),
    path('cart/' , views.cart , name = 'cart'),
    path('cart/<str:pk>/', views.cart_details , name= 'cartdetails'),
]