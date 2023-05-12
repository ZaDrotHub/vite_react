import React, { useState } from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const numberOfpagesOnWhichSide = window.innerWidth <= 645 ? 1 : 2;

  const renderPageNumbers = () => {
    const pageList = [];

    let hasStartedDots = false;
    let hasEndedDots = false;

    pageNumbers.map((item) => {
      if (
        ((currentPage === 1 || currentPage <= numberOfpagesOnWhichSide + 2) && item <= numberOfpagesOnWhichSide*2+3) ||
        ((currentPage === totalPages || currentPage >= totalPages - numberOfpagesOnWhichSide-1) &&
          item >= totalPages - (numberOfpagesOnWhichSide*2+2)) ||
        item === 1 ||
        item === totalPages ||
        (item >= currentPage - numberOfpagesOnWhichSide &&
          item <= currentPage + numberOfpagesOnWhichSide)
      ) {
        //
        pageList.push(
          <button
            key={item}
            onClick={() => onPageChange(item)}
            className={currentPage === item ? "button_clicked" : ""}
          >
            {item}
          </button>
        );
        hasStartedDots = false;
        hasEndedDots = false;
      } else if (!hasStartedDots && item < currentPage) {
        pageList.push(<span key={item}>. . .</span>);
        hasStartedDots = true;
      } else if (!hasEndedDots && item > currentPage && item < totalPages) {
        pageList.push(<span key={item}>. . .</span>);
        hasEndedDots = true;
      }
    });
    return pageList;
  };

  return (
    <div className="pagination">
      <div
        onClick={() => onPageChange(currentPage === 1 ? 1 : currentPage - 1)}
        className={`arrow arrow_left ${
          currentPage === 1 ? "arrow_disabled" : ""
        }`}
      ></div>
      <div className="pages">{renderPageNumbers()}</div>
      <div
        onClick={() =>
          onPageChange(
            currentPage === totalPages ? totalPages : currentPage + 1
          )
        }
        className={`arrow arrow_right ${
          currentPage === totalPages ? "arrow_disabled" : ""
        }`}
      ></div>
    </div>
  );
};

export default Pagination;
