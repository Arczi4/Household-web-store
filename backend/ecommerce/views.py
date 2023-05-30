from json import JSONDecodeError
from django.http import JsonResponse
from .serializers import ProductSerializer, OrderSerializer, OrderItemSerializer
from .models import Product, Order, Category, OrderItem
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.mixins import ListModelMixin, UpdateModelMixin, RetrieveModelMixin


class CategoryViewSet(ListModelMixin, RetrieveModelMixin, viewsets.GenericViewSet):
    """
    A simple ViewSet for listing or retrieving categories.
    """

    permission_classes = (IsAuthenticated,)
    queryset = Category.objects.all()
    serializer_class = ProductSerializer


class ProductViewSet(ListModelMixin, RetrieveModelMixin, viewsets.GenericViewSet):
    """
    A simple ViewSet for listing or retrieving products.
    """

    permission_classes = (IsAuthenticated,)
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class OrderViewSet(
    ListModelMixin, RetrieveModelMixin, UpdateModelMixin, viewsets.GenericViewSet
):
    """
    A simple ViewSet for listing, retrieving and creating orders.
    """

    permission_classes = (IsAuthenticated,)
    serializer_class = OrderSerializer

    def get_queryset(self):
        """
        This view should return a list of all the orders
        for the currently authenticated user.
        """
        user = self.request.user
        return Order.objects.filter(user=user)

    def create(self, request):
        try:
            data = JSONParser().parse(request)
            serializer = OrderSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                product = Product.objects.get(pk=data["product_name"])
                order = product.place_order(request.user, data["quantity"])
                return Response(OrderSerializer(order).data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except JSONDecodeError:
            return JsonResponse(
                {"result": "error", "message": "Json decoding error"}, status=400
            )


class OrderItemViewSet(ListModelMixin, RetrieveModelMixin, viewsets.GenericViewSet):
    """
    A simple ViewSet for listing or retrieving ordered items.
    """

    permission_classes = (IsAuthenticated,)
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer