import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { recipe } from "../types/types";
import { useApi } from "../Hooks/useApi";
import { Actions } from "../Components/Actions";
import { UploadForm } from "../UploadPage/UploadForm";
import { Recipe } from "./Recipe";
import { PrintableRecipe } from "../Components/Printable/PrintableRecipe";

export function RecipePage() {
  const [recipe, setRecipe] = useState<recipe | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const params = useParams();
  const nav = useNavigate();
  const recipeId = params.id;
  const api = useApi();

  useEffect(() => {
    if (!recipeId) return;
    const fetchRecipe = async () => {
      const response = await api.getRecipe(Number(recipeId));
      setRecipe(response);
    };
    fetchRecipe();
  }, [recipeId]);

  const onDelete = async () => {
    if (!recipe) {
      return;
    }
    const response = await api.deleteRecipe(recipe.id);
    console.log(response);
    if (response.status !== 200) {
      setDeleteError(true);
      return;
    } else {
      nav("/profile");
    }
  };

  return (
    <>
      {deleteError && (
        <div className="error">
          Something went wrong while deleting the recipe. Please try again.
        </div>
      )}
      <Actions onDelete={onDelete} onEdit={() => setEditMode((old) => !old)}>
        <PrintableRecipe recipe={recipe} />
      </Actions>
      {editMode ? <UploadForm recipe={recipe} /> : <Recipe recipe={recipe} />}
    </>
  );
}
