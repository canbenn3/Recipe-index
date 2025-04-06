# Recipe Index
## Features:
Absolutely necessary:
- Upload Recipes individually or as part of a collection
- Edit recipes. 
- View your own individual recipes
- View your own recipe books.
- Explore recipe books from other people.
- Print individual recipes or a whole recipe book in a uniform format.

It'd be nice to have the following features, but not required:
- A way to review recipes
- Tags to apply to recipes
- Search functionality.

## Pages
- [ ] Home page
    - Displays the most recently uploaded recipes.
- [ ] My Recipes
    - Lists all your recipe books by default, which you can click to view a separate page listing all the recipes included in that book
    - Can change to view all recipes
- [ ] Recipe Book
    - Shows all recipes contained within the book.
    - Has a button you can click to open a printer dialog for printing the entire recipe book.
    - Clicking on a recipe links to an individual recipe page.
- [ ] Individual Recipe Page
    - Lists all ingredients and steps for the recipe.
    - Has a link to any recipe books it may be a part of.

## Models
### Recipe
- Recipe books :    many to many
- name:             text
- overview:         text
- steps:            text
- Picture:          picture?
- Ingredients:      text
### Recipe Book
- Recipes:          many to many
- name:             text
- description:      text
### Review
- Recipe:           foreign key