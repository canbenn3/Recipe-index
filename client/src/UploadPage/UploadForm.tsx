import { useState } from "react";
import { useNavigate } from "react-router";
import { recipe } from "../types/types";
import { useApi } from "../Hooks/useApi";
import { Input } from "../Components/Input";
import { ListInput } from "../Components/ListInput";
import { ImageDisplay } from "./ImageDisplay";

interface UploadRecipeProps {
  recipe?: recipe | null;
}

export function UploadForm({ recipe }: UploadRecipeProps) {
  const [name, setName] = useState(recipe?.name || "");
  const [description, setDescription] = useState(recipe?.overview || "");
  const [ingredients, setIngredients] = useState<Record<string, string>>(
    recipe?.ingredients || { "1": "" }
  );
  const [steps, setSteps] = useState<Record<string, string>>(
    recipe?.steps || { "1": "" }
  );
  const [image, setImage] = useState<File | null>(null);
  const nav = useNavigate();
  const api = useApi();

  const submitForm = async () => {
    if (
      !name ||
      Object.keys(steps).length === 0 ||
      Object.keys(ingredients).length === 0
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    const submittedRecipe = {
      id: recipe?.id,
      name: name.trim(),
      description: description.trim(),
      ingredients: ingredients,
      steps: steps,
      image: image,
    };
    const response = await api.uploadRecipe(submittedRecipe);
    if (response.status === 201) {
      nav("/profile");
    }
  };

  return (
    <>
      <div className="recipe printable">
        <span className="recipe-header">
          <h1>
            <Input
              input={name.toUpperCase()}
              setInput={setName}
              instruction="Title of your Recipe"
            />
          </h1>
          <div className="img-container">
            {recipe?.image && !image ? (
              <img src={recipe?.image} alt="No image selected" />
            ) : (
              <ImageDisplay image={image} />
            )}
            <input
              name="image"
              type="file"
              onChange={(e) => {
                setImage(e.target.files ? e.target.files[0] : null);
              }}
            />
          </div>
        </span>
        <span className="hline"></span>

        <>
          <h2>Overview:</h2>
          <Input
            input={description}
            setInput={setDescription}
            instruction="Type a short overview (optional)"
          />
        </>
        <div className="recipe-columns">
          <div>
            <h2>INGREDIENTS -</h2>
            <ListInput
              className="ingredients-list"
              input={ingredients}
              setInput={setIngredients}
              instruction="Add ingredients here"
            />
          </div>
          <div>
            <h2>STEPS - </h2>
            <ListInput
              className="steps-list"
              input={steps}
              setInput={setSteps}
              instruction="List the steps for your recipe."
              ordered
            />
          </div>
        </div>
        <button onClick={submitForm}>Save Recipe</button>
      </div>
    </>
  );
}
