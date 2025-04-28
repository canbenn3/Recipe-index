import { useEffect, useState } from "react";
import { recipe, recipeBook } from "../types/types";
import { useApi } from "../Hooks/useApi";
import { Modal } from "../Components/Modal";
import { NewBookForm } from "./NewBookForm";
import { BookTab } from "../Components/BookTab";
import { BookDisplay } from "./BookDisplay";

interface BooksProps {
  books: recipeBook[];
  postChange: () => void;
  allRecipes: recipe[];
}

export function Books({ books, postChange, allRecipes }: BooksProps) {
  const [selectedBook, setSelectedBook] = useState<recipeBook | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleClick = (book: recipeBook) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  return (
    <div className="">
      <h1>Recipe Books</h1>
      {books && books.length > 0 ? (
        books.map((book, index) => {
          return (
            <BookTab
              key={book.id}
              recipeBook={book}
              onClick={() => handleClick(book)}
            ></BookTab>
          );
        })
      ) : (
        <p>Looks like you don't have any recipe books...</p>
      )}
      <Modal show={showModal} closeModal={() => setShowModal(false)}>
        <BookDisplay
          recipeBook={selectedBook}
          postChange={() => {
            setShowModal(false);
            postChange();
          }}
          allRecipes={allRecipes}
        />
      </Modal>
    </div>
  );
}
