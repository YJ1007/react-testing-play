import React from "react";
import PropTypes from "prop-types";

export default function ShowResult({ bookData, expandBook }){
  const bookTitle = bookData.best_book.title;
  let displayTitle = bookTitle.split(" ").slice(0, 4).join(" ");
  if (bookTitle.length > displayTitle.length) {
    displayTitle += "...";
  }
  return (
    <div>
      <img src={bookData.best_book.image_url} alt="Book cover" height="200px"/>
      <div>
        <p title={displayTitle.includes("...") ? bookTitle : ""}>{displayTitle}</p>
        <p>{bookData.best_book.author.name}</p>
        <button onClick={() => expandBook(bookData)}>
          More Info
        </button>
      </div>
    </div>
  );
};

ShowResult.propTypes = {
  bookData: PropTypes.object,
  expandBook: PropTypes.func
};
