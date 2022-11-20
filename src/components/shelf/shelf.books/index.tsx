import classNames from "classnames";
import { observer } from "mobx-react-lite";
import React, { useRef } from "react";
import { useMst } from "../../../hooks/useStore";
import Book from "../shared/book";
import Page from "../shared/page";

import "./style.scss";

const ShelfBooks = observer(() => {
  const {
    bookStore: { books, isLoading, addBookFile },
  } = useMst();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputClick: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    addBookFile(e.target.files?.item(0) || new File([], ""));
  };

  return (
    <Page
      title="Книги"
      toolbar={
        <div>
          <button className="bb-shelf-add-book" onClick={() => fileInputRef?.current?.click()}>+</button>
        </div>
      }
    >
      <input
        ref={fileInputRef}
        hidden
        type="file"
        onChange={handleInputClick}
      />
      <div className={classNames("bb-shelf-books")}>
        {books.map((book, index) => (
          <Book key={book.title + index} book={book} />
        ))}
      </div>
    </Page>
  );
});

export default ShelfBooks;
