import { recipeBook } from "../types/types";

interface BookTabProps {
  recipeBook: recipeBook;
  onClick: () => void;
}

export function BookTab({ recipeBook, onClick }: BookTabProps) {
  let firstImage = recipeBook.recipes[0]?.image;
  if (firstImage) {
    firstImage = `http://localhost:8000/media/images/${
      firstImage.split("/")[1]
    }`;
  }

  return (
    <div className="book-tab" onClick={onClick}>
      {firstImage && (
        <div className="thumbnail-container">
          <img className="thumbnail" src={firstImage} alt="Recipe Book Cover" />
        </div>
      )}
      <h3>{recipeBook.name}</h3>
    </div>
  );
}
