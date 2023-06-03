import datetime
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
    
    name = models.TextField(blank=False, null=False, unique=True)
    
    def __str__(self):
        return self.name


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
        return self
    
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

    def place_order(self, order, price, qty):
        #used to place an order
        
        # Get order object
        order = Order.objects.get(pk=order)
        
        if self.check_stock(qty):
            order_item = OrderItem.objects.create(
                product = self,
                order = order,
                price = price,
                quantity = qty
            )
            self.manage_stock(qty)
            return order_item
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
    adress = models.TextField(blank=False, null=True)
    postal_code = models.TextField(blank=False, null=True)
    city  = models.TextField(blank=False, null=True)
    created_date = models.DateTimeField(default=datetime.datetime.now())
    paid = models.BooleanField(blank=False, null=False, default=False)

    def __str__(self):
        return self


class OrderItem(
    TimeStampedModel,
    ActivatorModel ,
    Model):
    """
    ecommerce.OrderItem
    Stores a single ordered product. Each row conatin ordered product order_id price and qunatity
    """
    class Meta:
        verbose_name = 'OrderItem'
        verbose_name_plural = 'OrderItems'
        ordering = ["id"]
    
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, blank=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True)
    price = models.DecimalField(default=0, decimal_places=2, max_digits=100000, null=True, blank=True)
    quantity = models.IntegerField(default=0, null=True, blank=True)