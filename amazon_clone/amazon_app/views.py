from django.shortcuts import render
from .models import Products,Cart
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

import json

# Create your views here.
def products_data(request):
    products = list(Products.objects.all().values())  # convert queryset to list for JSON serialization

    return JsonResponse(products, safe=False)


def products(request):
    # products = Products.objects.all()

    # for product in products:
    #     product.stars = int(product.stars * 10)
    #     product.priceCents = round(float((product.priceCents)/100) , 2)

    # context = {'products' : products}
    return render(request , 'amazon.html')

def checkout(request):
    return render(request , 'checkout.html')

def orders(request):
    return render(request , 'orders.html')

@csrf_exempt
def cart(request):
    if request.method == "POST":
        data = json.loads(request.body)
        productId = data.get('productId')
        quantity = data.get('quantity')
        deliveryOptionId = data.get('deliveryOptionId')
        cart = Cart.objects.create(productId = productId , quantity = quantity , deliveryOptionId = deliveryOptionId)

        return JsonResponse({'status': 'success'})
    return JsonResponse({'error': 'Invalid request'}, status=400)

def login(request):
    return render(request , "login.html")

def register(request):
    return render(request , "register.html")
    