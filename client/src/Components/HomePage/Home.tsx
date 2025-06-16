import { useCallback } from "react";
import { RecipeCard } from "../RecipeCard";
import { useApi } from "../../Hooks/useApi";
import { usePagination } from "../../Hooks/usePagination";
import { Pagination } from "../Pagination";

export function Home() {
  const api = useApi();

  const fetchResults = useCallback((page: number) => {
    return api.getHomeRecipes(page, 25);
  }, []);

  const paginator = usePagination(fetchResults);

  return (
    <div className="central-content">
      <h1>Home</h1>
      <Pagination paginator={paginator}>
        <div className="recipes-container">
          {paginator?.data.map((recipe) => {
            return <RecipeCard recipe={recipe} key={recipe.id} />;
          })}
        </div>
      </Pagination>
    </div>
  );
}
