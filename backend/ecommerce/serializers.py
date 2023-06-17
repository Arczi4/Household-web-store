from collections import OrderedDict
from .models import Category, OrderItem, Product, Order, User
from rest_framework_json_api import serializers
from rest_framework import status
from rest_framework.exceptions import APIException


class NotEnoughStockException(APIException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = "There is not enough stock"
    default_code = "invalid"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "name"


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            "category",
            "product_name",
            "image",
            "description",
            "stock",
            "price",
        )


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = (
            "user",
            "adress",
            "postal_code",
            "city",
            "created_date",
            "paid",
        )


class OrderItemSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(), many=False
    )

    order = serializers.PrimaryKeyRelatedField(queryset=Order.objects.all(), many=False)

    class Meta:
        model = OrderItem
        fields = (
            "product",
            "order",
            "price",
            "quantity",
        )

    def validate(self, res: OrderedDict):
        """
        Used to validate Product stock levels
        """
        product = res.get("product")
        quantity = res.get("quantity")
        if not product.check_stock(quantity):
            raise NotEnoughStockException
        return res
