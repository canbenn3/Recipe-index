import { UsePaginationResult } from "../Hooks/usePagination";

interface PaginationProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  paginator: UsePaginationResult<T>;
}

export function Pagination<T>({ paginator, ...props }: PaginationProps<T>) {
  return (
    <>
      {props.children}
      <div className="pagination-nav">
        <button onClick={paginator.prevPage} disabled={!paginator.hasPrevious}>
          Back
        </button>
        <button onClick={paginator.nextPage} disabled={!paginator.hasNext}>
          Forward
        </button>
      </div>
    </>
  );
}
