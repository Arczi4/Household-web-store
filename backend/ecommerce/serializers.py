from collections import OrderedDict
from .models import Category, Product, Order
from rest_framework_json_api import serializers
from rest_framework import status
from rest_framework.exceptions import APIException


class NotEnoughStockException(APIException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = "There is not enough stock"
    default_code = "invalid"


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = "name"


class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        fields = (
            "title",
            "stock",
            "price",
        )


class OrderSerializer(serializers.HyperlinkedModelSerializer):
    product = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(), many=False
    )

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


class OrderItemSerializer(serializers.HyperlinkedModelSerializer):
    product = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(), many=False
    )

    class Meta:
        model = Order
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
