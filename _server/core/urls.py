from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('get_own_recipes', view=views.get_own_recipes, name="get_own_recipes"),
    path('get_own_recipe_books', view=views.get_own_recipe_books, name='get_own_recipe_books'),
    path('get_others_recipes', view=views.get_others_recipes, name='get_others_recipes'),
    path('get_home_recipes', view=views.get_home_recipes, name='get_home_recipes'),
    path('api/upload_recipe/', view=views.upload_recipe, name='upload_recipe'),
]