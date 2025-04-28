import { useState } from "react";
import { RecipeCard } from "../Components/RecipeCard";
import { recipe, recipeBook } from "../types/types";
import { Actions } from "../Components/Actions";
import { useApi } from "../Hooks/useApi";
import { SelectableCard } from "../Components/SelectableCard";

interface BookDisplayProps {
  recipeBook: recipeBook | null;
  postChange: () => void;
  allRecipes: recipe[];
}

export function BookDisplay({
  recipeBook,
  postChange,
  allRecipes,
}: BookDisplayProps) {
  if (!recipeBook) {
    return;
  }

  const [deleteError, setDeleteError] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedRecipes, setSelectedRecipes] = useState<Set<number>>(
    new Set(recipeBook?.recipes.map((recipe) => recipe.id) || [])
  );
  const api = useApi();

  const onDelete = async () => {
    if (!recipeBook) {
      return;
    }
    const response = await api.deleteRecipeBook(recipeBook.id);
    if (response.status !== 200) {
      setDeleteError(true);
      return;
    }
    postChange();
  };

  const onSave = async () => {
    console.log("saving recipe book!");
    const response = await api.editRecipeBook({
      ...recipeBook,
      recipes: Array.from(selectedRecipes),
    });
    if (response.status !== 200) {
      console.error("Error saving recipe book");
    }
    postChange();
    setEditMode(false);
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
        {recipeBook.recipes.length === 0 ? (
          <div>
            Looks like you don't have any recipes in here! Click on the edit
            icon to get started.
          </div>
        ) : (
          <div className="recipes-container">
            {editMode
              ? allRecipes.map((recipe) => {
                  return (
                    <SelectableCard
                      key={recipe.id}
                      recipe={recipe}
                      highlighted={selectedRecipes.has(recipe.id)}
                      handleClick={() => {
                        setSelectedRecipes((old) => {
                          const newSet = new Set(old);
                          if (old.has(recipe.id)) {
                            newSet.delete(recipe.id);
                          } else {
                            newSet.add(recipe.id);
                          }
                          return newSet;
                        });
                      }}
                    />
                  );
                })
              : recipeBook.recipes.map((recipe) => {
                  return <RecipeCard key={recipe.id} recipe={recipe} />;
                })}
          </div>
        )}
        {editMode && <button onClick={onSave}>Save Changes</button>}
      </div>
    </>
  );
}
