from django.db import models

# Create your models here.
class Order(models.Model):

    money = models.CharField(max_length=32)
    order_num=models.CharField(max_length=128)

    status_choice=(
        (1,"未支付"),
        (2,"已支付"),
    )
    status=models.IntegerField(choices=status_choice)
    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)
