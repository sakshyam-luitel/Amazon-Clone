from django.urls import path
from . import views

urlpatterns = [
    path('', views.products , name = 'amazon'),
    path('checkout/', views.checkout, name = 'checkout'),
    path('orders/' , views.orders , name = 'orders'),
    path('products/', views.products_data , name = 'products'),
    path('cart/' , views.cart , name = 'cart'),
]