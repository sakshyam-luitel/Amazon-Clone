from django.db import models

# Create your models here.
class Cart(models.Model):
    productId = models.CharField(max_length = 100, primary_key = True)
    quantity = models.IntegerField()
    deliveryOptionId = models.CharField(max_length = 50)

class Products(models.Model):
    id = models.CharField(max_length = 100 , primary_key = True)
    image = models.CharField(max_length = 255)
    name = models.CharField(max_length = 255)
    stars = models.FloatField()
    count = models.IntegerField()
    priceCents = models.IntegerField()
