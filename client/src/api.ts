import { uploadApiProps } from "./types";

export const useApi = () => ({
  uploadRecipe: async (recipe: uploadApiProps) => {
    const formData = new FormData();
    formData.append("name", recipe.name);
    formData.append("steps", recipe.steps);
    formData.append("ingredients", recipe.ingredients);
    if (recipe.description) {
      formData.append("description", recipe.description);
    }
    if (recipe.image) {
      formData.append("image", recipe.image);
    }

    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="))
      ?.split("=")[1];

    const response = await fetch("/api/upload_recipe/", {
        method: "POST",
        headers: {
            "X-CSRFToken": csrfToken || "",
        },
        body: formData,
    })
  },
});
