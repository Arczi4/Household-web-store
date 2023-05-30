import datetime
from django.contrib.auth.models import User
from ecommerce.models import OrderItem, Product, Order
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
from rest_framework.test import APITestCase
from rest_framework import status
from django.utils import timezone
import pytz


class EcommerceTestCase(APITestCase):
    """
    Test suite for Products and Orders
    """

    def setUp(self):
        Product.objects.create(
            title="Demo Product 1",
            description="This is a description for demo 1",
            price=500,
            stock=20,
        )
        Product.objects.create(
            title="Demo Product 2",
            description="This is a description for demo 2",
            price=700,
            stock=15,
        )
        Product.objects.create(
            title="Demo Product 3",
            description="This is a description for demo 3",
            price=300,
            stock=18,
        )
        Product.objects.create(
            title="Demo Product 4",
            description="This is a description for demo 4",
            price=400,
            stock=14,
        )
        Product.objects.create(
            title="Demo Product 5",
            description="This is a description for demo 5",
            price=500,
            stock=30,
        )
        self.Products = Product.objects.all()
        self.user = User.objects.create_user(
            username="testuser1", password="this_is_a_test", email="testuser1@test.com"
        )

        date = timezone.now()

        Order.objects.create(
            user=User.objects.first(),
            adress="Test adress 1",
            postal_code="11-123",
            city="Wroclaw",
            created_date=date,
            paid=False,
        )

        OrderItem.objects.create(
            product=Product.objects.first(),
            order=Order.objects.first(),
            price=100,
            quantity=1,
        )
        OrderItem.objects.create(
            product=Product.objects.first(),
            order=Order.objects.first(),
            price=100,
            quantity=2,
        )

        # The app uses token authentication
        self.token = Token.objects.get(user=self.user)
        self.client = APIClient()

        # We pass the token in all calls to the API
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)

    def test_get_all_Products(self):
        """
        test ProductsViewSet list method
        """
        self.assertEqual(self.Products.count(), 5)
        response = self.client.get("/product/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_one_Product(self):
        """
        test ProductsViewSet retrieve method
        """
        for Product in self.Products:
            response = self.client.get(f"/product/{Product.id}/")
            self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_order_is_more_than_stock(self):
        """
        test Product.check_stock when order.quantity > Product.stock
        """
        for i in self.Products:
            current_stock = i.stock
            self.assertEqual(i.check_stock(current_stock + 1), False)

    def test_order_equals_stock(self):
        """
        test Product.check_stock when order.quantity == Product.stock
        """
        for i in self.Products:
            current_stock = i.stock
            self.assertEqual(i.check_stock(current_stock), True)

    def test_order_is_less_than_stock(self):
        """
        test Product.check_stock when order.quantity < Product.stock
        """
        for i in self.Products:
            current_stock = i.stock
            self.assertTrue(i.check_stock(current_stock - 1), True)

    def test_create_order_with_more_than_stock(self):
        """
        test OrdersViewSet create method when order.quantity > Product.stock
        """
        for i in self.Products:
            stock = i.stock
            data = {
                "Product": str(i.id),
                "order": Order.objects.first(),
                "price": 10,
                "quantity": str(stock + 1),
            }
            response = self.client.post(f"/order-item/", data)
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_order_with_less_than_stock(self):
        """
        test OrdersViewSet create method when order.quantity < Product.stock
        """
        
        # Tutaj trzeba debug zrobić XD
        for i in self.Products:
            data = {
                "Product": str(i.id),
                "order": Order.objects.first(),
                "price": 10,
                "quantity": 1,
            }
            response = self.client.post(f"/order-item/", data)
            self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_order_item_with_equal_stock(self):
        """
        test OrdersViewSet create method when order.quantity == Product.stock
        """
        for i in self.Products:
            stock = i.stock
            data = {
                "Product": str(i.id),
                "order": Order.objects.first(),
                "price": 10,
                "quantity": str(stock),
            }
            response = self.client.post(f"/order-item/", data)
            self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_all_orders(self):
        """
        test OrdersViewSet list method
        """
        self.assertEqual(OrderItem.objects.count(), 2)
        response = self.client.get("/order-item/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_one_order(self):
        """
        test OrdersViewSet retrieve method
        """
        orders = Order.objects.filter(user=self.user)
        for o in orders:
            response = self.client.get(f"/order/{o.id}/")
            self.assertEqual(response.status_code, status.HTTP_200_OK)
