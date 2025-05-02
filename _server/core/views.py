from django.shortcuts import render
from django.conf  import settings
import json
import os
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .models import Recipe, Recipe_Book, Review
from django.db.models import Q
from django.http import JsonResponse, Http404
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.forms.models import model_to_dict

# Load manifest when server launches
MANIFEST = {}
if not settings.DEBUG:
    f = open(f"{settings.BASE_DIR}/core/static/manifest.json")
    MANIFEST = json.load(f)

# Create your views here.
@login_required
def index(req):
    context = {
        "asset_url": os.environ.get("ASSET_URL", ""),
        "debug": settings.DEBUG,
        "manifest": MANIFEST,
        "js_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["file"],
        "css_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["css"][0]
    }
    return render(req, "core/index.html", context)


@login_required
def get_own_recipe_books(req):
    user = req.user
    books = Recipe_Book.objects.filter(user=user).prefetch_related('recipes')
    response = {
        "data": [{
            "id": book.id,
            "name": book.name,
            "description": book.description,
            "recipes": list(book.recipes.values()),
        } for book in books]
    }
    return JsonResponse(response)


@login_required
def create_recipe_book(req):
    user = req.user
    body = json.loads(req.body)
    name = body.get("name", False)
    if not name:
        return JsonResponse({
            "error": "Name is required.",
            "status": 400,
            }, status=400)
    description = body.get('description', '')
    recipe_ids = body.get('recipe_ids', [])
    new_book = Recipe_Book.objects.create(
        user=user,
        name=name,
        description=description
    )

    recipes = Recipe.objects.filter(id__in=recipe_ids)
    new_book.recipes.set(recipes)
    return JsonResponse({
        "message": "Recipe book created successfully!",
        "book_id": new_book.id,
        "status": 201
    }, status=201
    )
    

@login_required
def upload_recipe(req):
    try:        
        user = req.user
        name = req.POST.get('name', False)
        ingredients = req.POST.get('ingredients', '')
        steps = req.POST.get('steps', '')
        overview = req.POST.get('description', '')
        image = req.FILES.get('image', None)
        if not name or not ingredients or not steps:
            return JsonResponse({
                "error": "Name, ingredients, and steps are required.",
                }, status=400)
        id = req.POST.get('id', False)
        if id:
            upload = Recipe.objects.get(id=id)
            if upload.user != req.user:
                raise PermissionError("You don't have permission to edit this object!")
        else:
            upload = Recipe.objects.create()
        upload.user = user
        upload.name = name
        upload.ingredients = ingredients
        upload.steps = steps
        upload.overview = overview
        if image:
            upload.image = image
        upload.save()
        return JsonResponse({
            "message": "Recipe uploaded successfully!",
            "status": 201,
        }, status=201
        )
    except Exception as e:
        return JsonResponse({
            "error": str(e),
            "status": 500,
        }, status=500
        )

@login_required
def get_recipes(req):
    book = req.GET.get("book", False)
    user = req.user
    if book:
        recipe_book = Recipe_Book.objects.filter(user=user,name=book)
        recipes = Recipe.objects.filter(user=user,recipe_books=recipe_book)
    else:
        recipes = Recipe.objects.filter(user=user)
    
    response = {
        "data": list(recipes.values())
    }
    return JsonResponse(response)


def get_others_recipes(req):
    username = req.GET.get("username", False)
    book = req.GET.get("book", False)
    user = User.filter(username=username).first()
    if not user:
        return Http404()
    if book:
        filters = (Q(user=user) & Q(recipe_books=book))
    else:
        filters = Q(user=user)
    recipes = Recipe.objects.filter(filters)
    response = {
        "data": recipes,
    }
    return JsonResponse(response)
    

def get_home_recipes(req, id):
    recipes = Recipe.objects.filter()
    pageManager = Paginator(recipes, 25)
    page_num = req.GET.get('page', 1)
    try:
        page = pageManager.page(page_num)
    except PageNotAnInteger:
        page = pageManager.page(1)
    except EmptyPage:
        page = pageManager.page(pageManager.num_pages)
    response = {
        "data": list(page.object_list.values()),
        "has_next": page.has_next(),
        "has_previous": page.has_previous(),
        "num_pages": pageManager.num_pages,
        "current_page": page.number,
    }

    return JsonResponse(response)
    

def get_recipe(req, id):
    recipe = Recipe.objects.filter(id=id).first()
    if not recipe:
        return JsonResponse({"error": "No recipe found"})
    recipe_dict = model_to_dict(recipe)
    if recipe.image:
        recipe_dict['image'] = recipe.image.url  # Convert ImageFieldFile to URL
    else:
        recipe_dict['image'] = None
    return JsonResponse(recipe_dict)


@login_required
def delete_recipe(req):
    recipe_id = json.loads(req.body).get("recipeId", False)
    if not recipe_id:
        return JsonResponse({"error": "No recipe found", "status": 404}, status=404)
    recipe = Recipe.objects.filter(id=recipe_id).first()
    if not recipe:
        return JsonResponse({"error": "No recipe found", "status": 404}, status=404)
    if recipe.user != req.user:
        return JsonResponse({"error": "You are not authorized to delete this recipe", "status": 401}, status=403)
    recipe.delete()
    return JsonResponse({"message": "Recipe deleted successfully", "status": 200}, status=200)

@login_required
def delete_recipe_book(req):
    book_id = json.loads(req.body).get("recipe_book_id", False)
    if not book_id:
        return JsonResponse({"error": "No recipe book found", "status": 404}, status=404)
    book = Recipe_Book.objects.filter(id=book_id).first()
    if not book_id:
        return JsonResponse({"error": "No recipe book found", "status": 404}, status=404)
    book.delete()
    return JsonResponse({"message": "Recipe book deleted successfully", "status": 200}, status=200)

@login_required
def edit_recipe_book(req):
    book = json.loads(req.body).get("recipe_book", False)
    if not book:
        return JsonResponse({"error": "No recipe book found", "status": 404}, status=404)
    book_obj = Recipe_Book.objects.filter(id=book.get("id")).first()
    if not book_obj:
        return JsonResponse({"error": "No recipe book found", "status": 404}, status=404)
    book_obj.name = book.get("name", book_obj.name)
    book_obj.description = book.get("description", book_obj.description)
    recipe_ids = book.get("recipes", [])
    if recipe_ids:
        recipes = Recipe.objects.filter(id__in=recipe_ids)
        book_obj.recipes.set(recipes)
    book_obj.save()
    return JsonResponse({"message": "Recipe book updated successfully", "status": 200}, status=200)