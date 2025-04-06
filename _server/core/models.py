from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Recipe(models.Model):
    user = models.ForeignKey(User, related_name="recipes", on_delete=models.CASCADE)
    name = models.TextField(null=False)
    ingredients = models.TextField(null=False)
    steps = models.TextField(null=False)
    overview = models.TextField()
    image = models.ImageField(upload_to='images/')

class Recipe_Book(models.Model):
    user = models.ForeignKey(User, 
        related_name="recipe_books", 
        on_delete=models.CASCADE)
    name = models.TextField(null=False)
    description = models.TextField()
    recipes = models.ManyToManyField(Recipe, related_name="recipe_books")

class Review(models.Model):
    user = models.ForeignKey(User, related_name="reviews", on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, related_name="reviews", on_delete=models.CASCADE)
    text = models.TextField()
    rating = models.IntegerField()


class Profile(models.Model):
    user = models.OneToOneField(User, related_name="profile", on_delete=models.CASCADE)