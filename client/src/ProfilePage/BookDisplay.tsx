import { useState } from "react";
import { RecipeCard } from "../Components/RecipeCard";
import { recipeBook } from "../types/types";
import { Actions } from "../Components/Actions";
import { useApi } from "../Hooks/useApi";
import { useNavigate } from "react-router";
import { SelectableCard } from "../Components/SelectableCard";

interface BookDisplayProps {
  recipeBook: recipeBook | null;
  postDelete: () => void;
}

export function BookDisplay({ recipeBook, postDelete }: BookDisplayProps) {
  if (!recipeBook) {
    return;
  }
  if (recipeBook.recipes.length === 0) {
    return (
      <div>
        Looks like you don't have any recipes in here! Click on the edit icon to
        get started.
      </div>
    );
  }

  const [deleteError, setDeleteError] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedRecipes, setSelectedRecipes] = useState<Set<number>>(
    new Set()
  );
  const api = useApi();
  const nav = useNavigate();

  const onDelete = async () => {
    if (!recipeBook) {
      return;
    }
    const response = await api.deleteRecipeBook(recipeBook.id);
    if (response.status !== 200) {
      setDeleteError(true);
      return;
    }
    postDelete();
  };

  return (
    <>
      {deleteError && (
        <div className="error">
          Something went wrong while deleting this recipe book. Please try
          again.
        </div>
      )}
        <Actions
          onDelete={onDelete}
          onEdit={() => setEditMode((old) => !old)}
          isHorizontal={true}
        />
        <div className="book-display">
          <h1>{recipeBook.name}</h1>
          <p>{recipeBook.description}</p>
          <div className="recipes-container">
            {recipeBook.recipes.map((recipe) => {
              if (editMode) {
                const highlighted = selectedRecipes.has(recipe.id);
                const handleClick = () => {
                  setSelectedRecipes((prev) => {
                    const newSet = new Set(prev);
                    if (prev?.has(recipe.id)) {
                      newSet.delete(recipe.id);
                    } else {
                      newSet.add(recipe.id);
                    }
                    return newSet;
                  });
                };
                return (
                  <SelectableCard
                    key={recipe.id}
                    recipe={recipe}
                    handleClick={handleClick}
                    highlighted={highlighted}
                  />
                );
              }
              return <RecipeCard key={recipe.id} recipe={recipe} />;
            })}
          </div>
          {editMode && (
            <div className="button-container">
              <button className="btn-delete">Delete Selected</button>
              <button className="btn-add">Add new recipes</button>
            </div>
          )}
        </div>
    </>
  );
}
