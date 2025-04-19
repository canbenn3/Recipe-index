import React, { CSSProperties, useEffect, useState } from "react";
import { recipeCardProps } from "../types";
import { useNavigate } from "react-router";

export function RecipeCard({ recipe }: recipeCardProps) {
  const nav = useNavigate();
  const image = `http://localhost:8000/media/images/${
    recipe.image.split("/")[1]
  }`;

  const handleClick = () => {
    nav(`/recipe/${recipe.id}`);
  };

  return (
    <div className="recipe-card" onClick={handleClick}>
      <img src={image} alt="No image" className="thumbnail"></img>
      <div className="name">{recipe.name}</div>
    </div>
  );
}
