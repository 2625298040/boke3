# Generated by Django 2.0.6 on 2021-02-19 09:12

import datetime
from django.db import migrations, models
import django.db.models.deletion
import tinymce.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BlogInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=150, verbose_name='博客标题')),
                ('author', models.CharField(default='', max_length=20, verbose_name='作者')),
                ('content', tinymce.models.HTMLField(verbose_name='博客正文')),
                ('visit', models.IntegerField(default=0, verbose_name='浏览量')),
                ('add_time', models.DateTimeField(default=datetime.datetime.now, verbose_name='发布时间')),
            ],
            options={
                'verbose_name': '博客信息',
                'verbose_name_plural': '博客信息',
                'db_table': 'blog_info',
            },
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='名称')),
            ],
            options={
                'verbose_name': '博客类别',
                'verbose_name_plural': '博客类别',
                'db_table': 'blog_category',
            },
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='称呼')),
                ('email', models.EmailField(max_length=254, verbose_name='邮箱')),
                ('content', models.CharField(max_length=500, verbose_name='内容')),
                ('pub', models.DateTimeField(default=datetime.datetime.now, verbose_name='发布时间')),
                ('blog', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='blog_comments', to='blogs.BlogInfo', verbose_name='博客')),
            ],
            options={
                'verbose_name': '博客评论',
                'verbose_name_plural': '博客评论',
                'db_table': 'blog_comment',
            },
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='名称')),
            ],
            options={
                'verbose_name': '博客标签',
                'verbose_name_plural': '博客标签',
                'db_table': 'blog_tag',
            },
        ),
        migrations.AddField(
            model_name='bloginfo',
            name='category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='category_blogs', to='blogs.Category', verbose_name='分类'),
        ),
        migrations.AddField(
            model_name='bloginfo',
            name='tag',
            field=models.ManyToManyField(default='', to='blogs.Tag', verbose_name='标签'),
        ),
    ]
