from django.urls import path
from django.contrib import admin
from core import views as core_views
from ecommerce import views as ecommerce_views
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token


router = routers.DefaultRouter()
router.register(r'product', ecommerce_views.ProductViewSet, basename='product')
router.register(r'order', ecommerce_views.OrderViewSet, basename='order')
router.register(r'order-item', ecommerce_views.OrderItemViewSet, basename='order-item')

urlpatterns = router.urls

urlpatterns += [
    path('admin/', admin.site.urls),
    path('contact/', core_views.ContactAPIView.as_view()),
    path('api-token-auth/', obtain_auth_token),
]
    