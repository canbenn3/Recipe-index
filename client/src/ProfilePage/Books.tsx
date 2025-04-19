import React, { useEffect, useState } from "react";
import { recipeBook } from "../types";
import { useApi } from "../api";

export function Books() {
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
      {!!books ? (
        books.map((book, index) => {
          return <div>{book.name}</div>;
        })
      ) : (
        <p>Looks like you don't have any recipe books...</p>
      )}
      <button>Add a new book!</button>
    </div>
  );
}
