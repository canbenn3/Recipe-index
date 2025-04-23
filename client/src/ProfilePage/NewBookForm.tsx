import React from "react";
import { useState } from "react";
import { recipe } from "../types";
import { SelectableCard } from "../Components/SelectableCard";

interface NewBookFormProps {
  recipes: recipe[];
}

export function NewBookForm({ recipes }: NewBookFormProps) {
  const [bookName, setBookName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedRecipes, setSelectedRecipes] = useState<Set<recipe>>(
    new Set()
  );

  return (
    <div className="new-book-form">
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
              if (prev?.has(recipe)) {
                newSet.delete(recipe);
                return newSet;
              } else {
                newSet?.add(recipe);
                return newSet;
              }
            });
          };

          const highlighted = selectedRecipes.has(recipe);

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

      <button>Create your recipe book!</button>
    </div>
  );
}
