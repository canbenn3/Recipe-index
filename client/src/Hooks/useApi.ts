import { recipe, uploadApiProps } from "../types/types";

const getCSRFToken = () => {
  const csrfToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken="))
    ?.split("=")[1];
  return csrfToken;
};

export const useApi = () => ({
  uploadRecipe: async (recipe: uploadApiProps) => {
    const formData = new FormData();
    formData.append("name", recipe.name);
    formData.append("steps", JSON.stringify(recipe.steps));
    formData.append("ingredients", JSON.stringify(recipe.ingredients));
    if (recipe.description) {
      formData.append("description", recipe.description);
    }
    if (recipe.image) {
      formData.append("image", recipe.image);
    }

    const csrfToken = getCSRFToken();

    const response = await fetch("/api/upload_recipe/", {
      method: "POST",
      headers: {
        "X-CSRFToken": csrfToken || "",
      },
      body: formData,
    });
  },

  getHomeRecipes: async (page: number) => {
    const response = await fetch(`/api/get_home_recipes/${page}`);
    const data = await response.json();
    return data;
  },

  getRecipe: async (recipeId: number) => {
    const res = await fetch(`/api/recipe/${recipeId}/`);
    const data = await res.json();

    const steps = JSON.parse(data.steps);
    const ingredients = JSON.parse(data.ingredients);
    data.steps = steps;
    data.ingredients = ingredients;
    return data;
  },

  getRecipeBooks: async () => {
    const response = await fetch("/api/get_own_recipe_books/");
    return response.json();
  },

  getRecipes: async (): Promise<{ data: recipe[] }> => {
    const response = await fetch("/api/get_recipes/");
    return response.json();
  },
});
