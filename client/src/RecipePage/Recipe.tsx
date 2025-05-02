import { recipe } from "../types/types";

export function Recipe({recipe}: {recipe: recipe | null}) {
  return (
    <div className="recipe printable">
      <span className="recipe-header">
        <h1>{recipe?.name.toUpperCase()}</h1>
        <img src={recipe?.image} alt="Nothing" />
      </span>
      <span className="hline"></span>

      {recipe?.overview && (
        <>
          <h2>Overview:</h2>
          <div>{recipe.overview}</div>
        </>
      )}
      <div className="recipe-columns">
        <div>
          <h2>INGREDIENTS -</h2>
          <ul className="ingredients-list">
            {recipe &&
              Object.entries(recipe.ingredients).map((key, index) => {
                return <li key={index}>{key[1]}</li>;
              })}
          </ul>
        </div>
        <div>
          <h2>STEPS - </h2>
          <ol className="steps-list">
            {recipe &&
              Object.entries(recipe.steps).map((key, index) => {
                return <li key={index}>{key[1]}</li>;
              })}
          </ol>
        </div>
      </div>
    </div>
  );
}
