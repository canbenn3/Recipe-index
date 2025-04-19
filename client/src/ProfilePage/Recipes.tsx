import React, { useEffect, useState } from "react";
import { recipe } from "../types";
import { useApi } from "../api";
import { RecipeCard } from "../Components/RecipeCard";
import { useNavigate } from "react-router";

export function Recipes() {
  const [recipes, setRecipes] = useState<recipe[]>();
  const api = useApi();
  const nav = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await api.getRecipes();
      setRecipes(response.data);
    };
    fetchRecipes();
  }, []);

  const addNewRecipe = () => {
    nav("/upload");
  };

  return (
    <div>
      <h2>My Recipes</h2>
      <div className="recipes-container">
        {recipes &&
          recipes.map((recipe) => {
            return <RecipeCard recipe={recipe} key={recipe.id} />;
          })}
      </div>
      <button onClick={addNewRecipe}> Add a new recipe!</button>
    </div>
  );
}
