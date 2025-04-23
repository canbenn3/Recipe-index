import React, { useEffect, useState } from "react";
import { recipe, recipeBook } from "../types";
import { useApi } from "../Hooks/useApi";
import { Modal } from "../Components/Modal";
import { NewBookForm } from "./NewBookForm";

interface BooksProps {
  recipes: recipe[];
}

export function Books({ recipes }: BooksProps) {
  const [books, setBooks] = useState<recipeBook[]>();
  const api = useApi();

  useEffect(() => {
    async function populateBooks() {
      const books = await api.getRecipeBooks();
      setBooks(books.data);
    }
    populateBooks();
  }, []);

  return (
    <div className="">
      <h1>Recipe Books</h1>
      {books && books.length > 0 ? (
        books.map((book, index) => {
          return <div>{book.name}</div>;
        })
      ) : (
        <p>Looks like you don't have any recipe books...</p>
      )}
    </div>
  );
}
