from django.contrib import admin
from .models import Contact
from ecommerce.models import OrderItem


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description', 'email')
    