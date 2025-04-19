import React, { useEffect, useState } from "react";
import { RecipeCard } from "../Components/RecipeCard";
import { recipePage } from "../types";

export function Home() {
  const [page, setPage] = useState(0);
  const [recipes, setRecipes] = useState<recipePage>();

  useEffect(() => {
    const fetchRecipes = async () => {
      console.log(page);
      const response = await fetch(`/api/get_home_recipes/${page}`);
      const data = await response.json();
      setRecipes(data);
    };
    fetchRecipes();
  }, [page]);

  return (
    <div className="home">
      <h1>Home</h1>
      <div className="recipes-container">
        {recipes?.data.map((recipe) => {
          return <RecipeCard recipe={recipe} key={recipe.id} />;
        })}
      </div>
    </div>
  );
}
