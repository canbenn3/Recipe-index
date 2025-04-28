from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('api/get_recipes/', view=views.get_recipes, name="get_own_recipes"),
    path('api/get_own_recipe_books/', view=views.get_own_recipe_books, name='get_own_recipe_books'),
    path('api/get_others_recipes/', view=views.get_others_recipes, name='get_others_recipes'),
    path('api/get_home_recipes/<int:id>/', view=views.get_home_recipes, name='get_home_recipes'),
    path('api/upload_recipe/', view=views.upload_recipe, name='upload_recipe'),
    path('api/recipe/<int:id>/', view=views.get_recipe, name='get_recipe'),
    path('api/delete_recipe/', view=views.delete_recipe, name='delete_recipe'),
    path('api/create_recipe_book/', view=views.create_recipe_book, name='create_recipe_book'),
    path('api/delete_recipe_book/', view=views.delete_recipe_book, name='delete_recipe_book'),
]