import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import PropTypes from 'prop-types';

export default function Pagination({
  currentPage,
  totalPages,
  handlePrev,
  handleNext,
}) {
  return (
    <section className="flex justify-between items-center gap-6 py-2">
      <button
        type="button"
        className={`px-2 py-2 rounded-lg flex items-center gap-1 ${currentPage===1?'disable':'bg-accent hover:brightness-95'} `}
        onClick={handlePrev}
        disabled={currentPage===1}
      >
        <FaAngleLeft />
        Previous
      </button>
      <section className="flex gap-2 text-gray">
        <span>{currentPage}</span>
        of
        <span>{totalPages}</span>
      </section>
      <button
        type="button"
        className={`px-2 py-2 rounded-lg flex items-center gap-1 ${currentPage===totalPages?'disable':'bg-accent hover:brightness-95'} `}
        onClick={handleNext}
        disabled={currentPage===totalPages}

      >
        Next
        <FaAngleRight />
      </button>
    </section>
  );
}

Pagination.propTypes={
  currentPage:PropTypes.number,
  totalPages:PropTypes.number,
  handlePrev:PropTypes.func,
  handleNext:PropTypes.func
}
