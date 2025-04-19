import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { recipe } from "../types";
import { useApi } from "../api";

export function Recipe() {
  const [recipe, setRecipe] = useState<recipe | null>(null);
  const params = useParams();
  const recipeId = params.id;
  const api = useApi();

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await api.getRecipe(Number(recipeId));
      setRecipe(response);
    };
    fetchRecipe();
  }, []);

  return (
    <div className="recipe">
      <span className="recipe-header">
        <h1>{recipe?.name}</h1>
        <img src={recipe?.image} alt="Nothing" />
      </span>

      <h2>Overview</h2>
      <div>{recipe?.overview}</div>

      <h2>Ingredients</h2>
      <ol>
        {recipe &&
          Object.entries(recipe.ingredients).map((key, index) => {
            return <li key={index}>{key[1]}</li>;
          })}
      </ol>

      <h2>Steps</h2>
      <ol>
        {recipe &&
          Object.entries(recipe.steps).map((key, index) => {
            return <li key={index}>{key[1]}</li>;
          })}
      </ol>
    </div>
  );
}
