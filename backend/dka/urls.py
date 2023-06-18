from django.urls import path
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from core import views as core_views
from ecommerce import views as ecommerce_views
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token

router = routers.DefaultRouter()
router.register(r'product', ecommerce_views.ProductViewSet, basename='product')
router.register(r'category', ecommerce_views.CategoryViewSet, basename='category')
router.register(r'order', ecommerce_views.OrderViewSet, basename='order')
router.register(r'order-item', ecommerce_views.OrderItemViewSet, basename='order-item')
router.register(r'api/user', core_views.CreateUserView, basename='api/user')
urlpatterns = router.urls

urlpatterns += [
    path('admin/', admin.site.urls),
    path('contact/', core_views.ContactAPIView.as_view()),
    path('api-token-auth/', obtain_auth_token),
    # path('api/users/', core_views.CreateUserView.as_view(), name='create_user'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    