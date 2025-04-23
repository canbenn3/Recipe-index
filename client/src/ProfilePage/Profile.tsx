import React, { useEffect, useRef, useState } from "react";
import { Books } from "./Books";
import { Recipes } from "./Recipes";
import { useApi } from "../Hooks/useApi";
import { recipe } from "../types";
import { Modal } from "../Components/Modal";
import { NewBookForm } from "./NewBookForm";

export function Profile() {
  const [recipes, setRecipes] = useState<recipe[]>([]);
  const [showModal, setShowModal] = useState(false);
  const api = useApi();

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await api.getRecipes();
      setRecipes(response.data);
    };
    fetchRecipes();
  }, []);

  const handleClick = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div className="central-content">
      <Books recipes={recipes} />
      <button onClick={handleClick}>Add a new book!</button>
      <Modal show={showModal} closeModal={handleClick}>
        <NewBookForm recipes={recipes} />
      </Modal>
      <Recipes recipes={recipes} />
    </div>
  );
}
