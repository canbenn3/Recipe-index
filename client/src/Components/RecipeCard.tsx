import { useNavigate } from "react-router";
import { recipe } from "../types/types";
import { cardText } from "../util/util";

interface recipeCardProps {
  recipe: recipe;
}

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
      <div className="thumbnail-container">
        <img src={image} alt="No image" className="thumbnail"></img>
      </div>
      <div className="name">{cardText(recipe?.name)}</div>
    </div>
  );
}
