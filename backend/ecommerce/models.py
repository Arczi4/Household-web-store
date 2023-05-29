from django.db import models
from django.contrib.auth.models import User
from utils.model_abstracts import Model
from django_extensions.db.models import (
    TimeStampedModel,
    ActivatorModel,
    TitleSlugDescriptionModel
)


class Category(
    TimeStampedModel,
    ActivatorModel ,
    TitleSlugDescriptionModel,
    Model):
    """
    ecommerce.Category
    Stores a single category entry for our shop
    """
    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
        ordering = ["id"]
    
    name = models.TextField(blank=False, null=False)


class Product(
    TimeStampedModel,
    ActivatorModel ,
    TitleSlugDescriptionModel,
    Model):

    """
    ecommerce.Product
    Stores a single product entry for our shop
    """

    class Meta:
        verbose_name = 'Product'
        verbose_name_plural = 'Products'
        ordering = ["id"]

    def __str__(self):
        return self.title
    
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True)
    product_name = models.TextField(blank=False, null=True)
    image = models.ImageField(null=True, blank=True)
    description = models.TextField(blank=False, null=True)
    price = models.IntegerField(default=0)
    stock = models.IntegerField(default=1)

    def amount(self):
        #converts price from pence to pounds
        amount = float(self.price / 100)
        return amount

    def manage_stock(self, qty):
        #used to reduce Product stock
        new_stock = self.stock - int(qty)
        self.stock = new_stock
        self.save()


    def check_stock(self, qty):
        #used to check if order quantity exceeds stock levels
        if int(qty) > self.stock:
            return False
        return True

    def place_order(self, user, qty):
        #used to place an order
        if self.check_stock(qty):
            order = Order.objects.create(
                product = self, 
                quantity = qty, 
                user= user)
            self.manage_stock(qty)
            return order
        else:
            return None




class Order(
    TimeStampedModel,
    ActivatorModel ,
    Model):
    """
    ecommerce.Order
    Stores a single order entry, related to :model:`ecommerce.Product` and
    :model:`auth.User`.
    """
    class Meta:
        verbose_name = 'Order'
        verbose_name_plural = 'Orders'
        ordering = ["id"]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    product = models.ForeignKey(Product, null=True, blank=True, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.user.username} - {self.product.title}'
