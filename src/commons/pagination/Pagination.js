import React, { useState } from "react";
import "./pagination.css";

export const Pagination = (props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (event) => {
    if (event.target.id !== currentPage) {
      setCurrentPage(Number(event.target.id));
      let indexOfLastItem = event.target.id * props.itemsByPage;
      let indexOfFirstItem = indexOfLastItem - props.itemsByPage;

      props.setItems(props.items.slice(indexOfFirstItem, indexOfLastItem));
    }
  };

  const generatePages = () => {
    let pageNumbers = [];

    for (
      let i = 0;
      i < Math.ceil(props.items.length / props.itemsByPage);
      i++
    ) {
      pageNumbers.push(i + 1);
    }

    return pageNumbers.map((page) => (
      <span
        className={currentPage === page ? "page active-page" : "page"}
        key={page}
        id={page}
        onClick={handleClick}
      >
        {page}
      </span>
    ));
  };

  return <p className>Páginas: {generatePages()} </p>;
};
