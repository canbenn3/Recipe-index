import React, { useState } from "react";
import { ingredientInputProps } from "../types";

export function IngredientInput({
  ingredient,
  ingredientNum,
  setIngredient,
}: ingredientInputProps) {
  function setHeight(textarea: HTMLTextAreaElement) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  return (
    <div className="list-item">
      <label>
        <div>{ingredientNum}</div>
        <textarea
          onChange={(e) => {
            setIngredient(e.target.value);
            setHeight(e.target);
          }}
          value={ingredient}
        />
      </label>
    </div>
  );
}
