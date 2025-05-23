import { recipe } from "../../types/types";
import { RecipeCard } from "../RecipeCard";
import { useNavigate } from "react-router";

export function Recipes({ recipes }: { recipes: recipe[] | undefined }) {
  const nav = useNavigate();
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
      <button className="btn-submit" onClick={addNewRecipe}>
        Add a new recipe!
      </button>
    </div>
  );
}
