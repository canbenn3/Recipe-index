import React, { useEffect, useState } from "react";
import { StepInput } from "./StepInput";
import { IngredientInput } from "./IngredientInput";
import { ImageDisplay } from "./ImageDisplay";
import { useApi } from "../Hooks/useApi";

export function UploadForm() {

  const api = useApi();

  const [steps, setSteps] = useState<string[]>([""]);
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  function addStep() {
    setSteps((prevSteps) => {
      const newSteps = [...prevSteps, ""];
      return newSteps;
    });
  }

  function setStep(index: number) {
    return (value: string) => {
      setSteps((prevSteps) => {
        const newSteps = [...prevSteps];
        newSteps[index] = value;
        return newSteps;
      });
    };
  }

  function addIngredient() {
    setIngredients((prev) => {
      const newIngredients = [...prev, ""];
      return newIngredients;
    });
  }

  function setIngredient(index: number) {
    return (value: string) => {
      setIngredients((prev) => {
        const newIngredients = [...prev];
        newIngredients[index] = value;
        return newIngredients;
      });
    };
  }

  function submitForm() {
    if (!name || !steps.length || !ingredients.length) {
      alert("Please fill in all required fields.");
      return;
    }
    // Compile into a json format
    let compiledSteps = {};
    let compiledIngredients = {};
    steps.forEach((step, index) => {
      compiledSteps[`${index + 1}`] = step 
    })
    ingredients.forEach((ingredient, index) => {
      compiledIngredients[`${index + 1 }`] = ingredient.trim()
    })

    const submittedRecipe = {
      name: name.trim(),
      description: description.trim(),
      ingredients: compiledIngredients,
      steps: compiledSteps,
      image: image,
    }
    api.uploadRecipe(submittedRecipe)
  }

  return (
    <div className="upload-form">
      <h2>Upload a new Recipe </h2>

      <label>
        Name*
        <input
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Description
        <input
          name="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      <label>
        Steps*
        <div className="steps-container">
          {steps.map((step, index) => (
            <StepInput
              step={step}
              setStep={setStep(index)}
              stepNum={index + 1}
              key={index + 1}
            />
          ))}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            addStep();
          }}
        >
          Add Step
        </button>
      </label>

      <label>
        ingredients*
        <div className="ingredients-container">
          {ingredients.map((ingredient, index) => (
            <IngredientInput
              ingredient={ingredient}
              ingredientNum={index + 1}
              setIngredient={setIngredient(index)}
              key={index + 1}
            />
          ))}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            addIngredient();
          }}
        >
          Add Ingredient
        </button>
      </label>

      <label>
        Image
        <input
          name="image"
          type="file"
          onChange={(e) => {
            setImage(e.target.files ? e.target.files[0] : null);
          }}
        />
      </label>
      <ImageDisplay image={image ? image : null} />

      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          submitForm();
        }}
      >
        Submit Recipe
      </button>
    </div>
  );
}
