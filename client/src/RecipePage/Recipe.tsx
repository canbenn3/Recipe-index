import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { recipe } from "../types";
import { useApi } from "../Hooks/useApi";

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
        <h1>{recipe?.name.toUpperCase()}</h1>
        <img src={recipe?.image} alt="Nothing" />
      </span>
      <span className="hline"></span>

      {recipe?.overview && (
        <>
          <h2>Overview:</h2>
          <div>{recipe.overview}</div>
        </>
      )}
      <div className="recipe-columns">
        <div>
          <h2>INGREDIENTS -</h2>
          <ul className="ingredients-list">
            {recipe &&
              Object.entries(recipe.ingredients).map((key, index) => {
                return <li key={index}>{key[1]}</li>;
              })}
          </ul>
        </div>
        <div>
          <h2>STEPS - </h2>
          <ol className="steps-list">
            {recipe &&
              Object.entries(recipe.steps).map((key, index) => {
                return <li key={index}>{key[1]}</li>;
              })}
          </ol>
        </div>
      </div>
    </div>
  );
}
