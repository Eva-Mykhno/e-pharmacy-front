import s from "./Pagination.module.css";

const sprite = "/sprite.svg";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  if (totalPages <= 1) return null;

  const renderPagination = () => {
    const pages = [];

    if (currentPage === 1) {
      pages.push(1, 2, "...");
    } else if (currentPage === 2) {
      pages.push(1, 2, 3);
    } else if (currentPage === totalPages) {
      pages.push("...", totalPages - 1, totalPages);
    } else if (currentPage === totalPages - 1) {
      pages.push("...", totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push("...", currentPage - 1, currentPage, currentPage + 1, "...");
    }

    return pages.filter(Boolean).map((page, index) => (
      <button
        key={index}
        onClick={() => typeof page === "number" && handlePageChange(page)}
        className={currentPage === page ? s.active : s.number}
        disabled={typeof page !== "number"}>
        {page}
      </button>
    ));
  };

  return (
    <div className={s.pagination}>
      <div className={s.buttons}>
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className={s.narrows}>
          <svg className={s.narrow}>
            <use href={`${sprite}#icon-backward`} />
          </svg>
        </button>

        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={s.narrows}>
          <svg className={s.narrow}>
            <use href={`${sprite}#icon-chevron-left`} />
          </svg>
        </button>
      </div>

      <div className={s.buttons}>{renderPagination()}</div>

      <div className={s.buttons}>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={s.narrows}>
          <svg className={s.narrow}>
            <use href={`${sprite}#icon-chevron-right`} />
          </svg>
        </button>

        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={s.narrows}>
          <svg className={s.narrow}>
            <use href={`${sprite}#icon-forward`} />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
