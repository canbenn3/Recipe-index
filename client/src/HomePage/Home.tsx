import React, { useEffect, useState } from "react";
import { RecipeCard } from "../Components/RecipeCard";
import { recipePage } from "../types";
import { useApi } from "../Hooks/useApi";

export function Home() {
  const [page, setPage] = useState(0);
  const [recipes, setRecipes] = useState<recipePage>();
  const api = useApi();

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await api.getHomeRecipes(page);
      setRecipes(response);
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
