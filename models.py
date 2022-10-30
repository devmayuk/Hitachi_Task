from django.db import models
from db import db


class Img(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    img = db.Column(db.Text, unique=True, nullable=False)
    name = db.Column(db.Text, nullable=False)
    mimetype = db.Column(db.Text, nullable=False)


class User(db.Table):
    label = db.Column(db.String(64))
    image_cat_1 = db.Column(db.String(256))
    image_cat_2 = db.Column(db.String(256))
    value = db.Column(db.Integer, index=True)

#
# class Details(db.Model):
#     label = models.AutoField(primary_key=True)
#     image_cat_1 = models.CharField(max_length=30)
#     image_cat_2 = models.CharField(max_length=30)
#     value = models.CharField(max_length=30)
