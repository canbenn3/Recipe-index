import { useState } from "react";
import { recipe } from "../types/types";
import { SelectableCard } from "../Components/SelectableCard";
import { useApi } from "../Hooks/useApi";

interface NewBookFormProps {
  recipes: recipe[];
  postSubmit: () => void;
}

export function NewBookForm({ recipes, postSubmit }: NewBookFormProps) {
  const [bookName, setBookName] = useState("");
  const [description, setDescription] = useState("");
  const [uploadError, setUploadError] = useState(false);
  const [selectedRecipes, setSelectedRecipes] = useState<Set<number>>(
    new Set()
  );
  const api = useApi();

  const handleSubmit = async () => {
    console.log("Book Name:", bookName);
    console.log("Description:", description);
    console.log("Selected Recipes:", Array.from(selectedRecipes));
    const response = await api.createRecipeBook({
      name: bookName,
      description: description,
      recipes: Array.from(selectedRecipes),
    });
    if (response.status !== 201) {
      setUploadError(true);
      return;
    }
    postSubmit();
    return;
  };

  return (
    <div className="new-book-form">
      {uploadError && (
        <div className="error">
          There was an error creating your recipe book
        </div>
      )}
      <label>
        Book Name:
        <input
          name="name"
          type="text"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
        />
      </label>

      <label>
        Description:
        <input
          name="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      <h2>Select which recipes you want in this recipe book!</h2>
      <div className="recipes-container select-many">
        {recipes.map((recipe) => {
          const handleClick = () => {
            setSelectedRecipes((prev) => {
              const newSet = new Set(prev);
              if (prev?.has(recipe.id)) {
                newSet.delete(recipe.id);
                return newSet;
              } else {
                newSet?.add(recipe.id);
                return newSet;
              }
            });
          };

          const highlighted = selectedRecipes.has(recipe.id);

          return (
            <SelectableCard
              recipe={recipe}
              highlighted={highlighted}
              handleClick={handleClick}
              key={recipe.id}
            />
          );
        })}
      </div>

      <button onClick={handleSubmit}>Create your recipe book!</button>
    </div>
  );
}
