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
    user = User.get(user=req.user)
    books = Recipe_Book.objects.filter(user=user)
    response = {
        "data": books
    }
    return JsonResponse(response)


@login_required
def upload_recipe(req):
    print("Uploading recipe...")

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
        upload = Recipe(
            user=user,
            name=name,
            ingredients=ingredients,
            steps=steps,
            overview=overview,
            image=image
        )
        upload.save()
        return JsonResponse({
            "message": "Recipe uploaded successfully!"
        }, status=201
        )
    except Exception as e:
        return JsonResponse({
            "error": str(e),
        }, status=500
        )

@login_required
def get_own_recipes(req):
    user = User.get(user=req.user)        
    book = req.GET.get("book", False)
    if book:
        recipe_book = Recipe_Book.filter(user=user,name=book)
        recipes = Recipe.objects.filter(user=user,recipe_books=recipe_book)
    else:
        recipes = Recipe.objects.filter(user=user)
    
    response = {
        "data": recipes
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
    

def get_home_recipes(req):
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
        "data": page,
    }

    return JsonResponse(response)
    