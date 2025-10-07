interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  function nextHandler() {
    onPageChange(currentPage + 1);
  }

  function backHandler() {
    onPageChange(currentPage - 1);
  }

  

  // 👇 visible pages range (2 before & 2 after current)
  const start = Math.max(0, currentPage - 2);
  const end = Math.min(totalPages - 1, currentPage + 2);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-3 bg-gray-300 py-2 rounded-sm">
      <button
        onClick={backHandler}
        disabled={currentPage === 0}
        className="px-3 py-1 rounded bg-gray-200 disabled:cursor-not-allowed"
      >
        Prev
      </button>

      {start > 0 && (
        <>
          <button onClick={() => onPageChange(0)} className="px-3 py-1 rounded bg-gray-100">
            1
          </button>
          {start > 1 && <span>...</span>}
        </>
      )}

      {Array.from({ length: end - start + 1 }, (_, i) => {
        const page = start + i;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded ${
              page === currentPage ? "bg-sky-500 text-white" : "bg-gray-100"
            }`}
          >
            {page + 1}
          </button>
        );
      })}

      {end < totalPages - 1 && (
        <>
          {end < totalPages - 2 && <span>...</span>}
          <button
            onClick={() => onPageChange(totalPages - 1)}
            className="px-3 py-1 rounded bg-gray-100"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={nextHandler}
        disabled={currentPage === totalPages - 1}
        className="px-3 py-1 rounded bg-gray-200 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}
