# Generated by Django 2.0.6 on 2019-09-26 11:37

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blogs', '0003_auto_20190926_1136'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bloginfo',
            name='add_time',
            field=models.DateTimeField(default=datetime.datetime.now, verbose_name='发布时间'),
        ),
        migrations.AlterField(
            model_name='comment',
            name='pub',
            field=models.DateTimeField(default=datetime.datetime.now, verbose_name='发布时间'),
        ),
    ]
