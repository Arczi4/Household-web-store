# Generated by Django 4.1.3 on 2023-05-29 20:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Item',
            new_name='Product',
        ),
        migrations.AlterModelOptions(
            name='product',
            options={'ordering': ['id'], 'verbose_name': 'Product', 'verbose_name_plural': 'Products'},
        ),
        migrations.RenameField(
            model_name='order',
            old_name='item',
            new_name='product',
        ),
    ]
