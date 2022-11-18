import { WebviewWindow } from "@tauri-apps/api/window";
import { observer } from "mobx-react-lite";
import React, { useCallback } from "react";
import { BookModel } from "../../../../models/shared/Book.model";

import "./style.scss";

type Props = {
  book: BookModel;
};

const Book: React.FC<Props> = observer(({ book }) => {
  const handleBookClick = useCallback(() => {
    new WebviewWindow("reader", {
      url: `/reader/${book.id}`,
      title: book.title,
    });
  }, [book.id]);

  return (
    <div className="bb-book" onClick={handleBookClick}>
      <div className="bb-book-cover">
        {book.cover ? (
          <img src={book.cover} alt="loading" />
        ) : (
          <React.Fragment />
        )}
      </div>
      <div className="bb-book-footer">
        <div className="bb-book-title">{book.title}</div>
      </div>
    </div>
  );
});

export default Book;
