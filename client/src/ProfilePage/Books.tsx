import { useEffect, useState } from "react";
import { recipe, recipeBook } from "../types/types";
import { useApi } from "../Hooks/useApi";
import { Modal } from "../Components/Modal";
import { NewBookForm } from "./NewBookForm";
import { BookTab } from "../Components/BookTab";
import { BookDisplay } from "./BookDisplay";

interface BooksProps {
  recipes: recipe[];
}

export function Books({ recipes }: BooksProps) {
  const [books, setBooks] = useState<recipeBook[]>();
  const [selectedBook, setSelectedBook] = useState<recipeBook | null>(null);
  const [showModal, setShowModal] = useState(false);
  const api = useApi();

  useEffect(() => {
    async function populateBooks() {
      const books = await api.getRecipeBooks();
      setBooks(books.data);
    }
    populateBooks();
  }, [showModal]);

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
          postDelete={() => setShowModal(false)}
        />
      </Modal>
    </div>
  );
}
