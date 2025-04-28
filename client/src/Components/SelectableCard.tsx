import { recipe } from "../types/types";

interface SelectableCardProps {
  recipe: recipe;
  highlighted: boolean;
  handleClick: () => void;
}

export function SelectableCard({
  recipe,
  highlighted,
  handleClick,
}: SelectableCardProps) {
  const image = `http://localhost:8000/media/images/${
    recipe.image.split("/")[1]
  }`;

  let className = "recipe-card";
  if (highlighted) {
    className += " highlighted";
  }
  return (
    <div className={className} onClick={handleClick}>
      <div className="thumbnail-container">
        <img src={image} alt="No image" className="thumbnail"></img>
      </div>
      <span>
        <input
          className="recipe-checkbox"
          checked={highlighted}
          type="checkbox"
          onChange={() => {}} // Prevents warning about uncontrolled checkbox
        />
        {recipe.name}
      </span>
    </div>
  );
}
