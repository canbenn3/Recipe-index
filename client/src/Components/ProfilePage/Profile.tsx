import { useEffect, useState } from "react";
import { Books } from "./Books";
import { Recipes } from "./Recipes";
import { useApi } from "../../Hooks/useApi";
import { recipe, recipeBook } from "../../types/types";
import { Modal } from "../Modal";
import { NewBookForm } from "./NewBookForm";

export function Profile() {
  const [recipes, setRecipes] = useState<recipe[]>([]);
  const [books, setBooks] = useState<recipeBook[]>([]);
  const [showModal, setShowModal] = useState(false);
  const api = useApi();

  const refreshRecipes = async () => {
    const response = await api.getRecipes();
    setRecipes(response.data);
  };

  const refreshBooks = async () => {
    const response = await api.getRecipeBooks();
    setBooks(response.data);
  };

  useEffect(() => {
    refreshRecipes();
    refreshBooks();
  }, []);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div className="central-content">
      <Books
        books={books}
        postChange={() => refreshBooks()}
        allRecipes={recipes}
      />
      <button className="btn-submit" onClick={toggleModal}>
        Add a new book!
      </button>
      <Modal show={showModal} closeModal={toggleModal}>
        <NewBookForm
          recipes={recipes}
          postSubmit={() => {
            toggleModal();
            refreshBooks();
          }}
        />
      </Modal>
      <Recipes recipes={recipes} />
    </div>
  );
}
