import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../../hooks/useStore";
import Book from "../shared/book";
import Page from "../shared/page";

const ShelfBooks = observer(() => {
  const {
    bookStore: { books, isLoading, addBookFile },
  } = useStore();

  
  return (
    <Page title="Книги">
      <input
        type="file"
        onChange={(e) => {
          addBookFile(e.target.files?.item(0) || new File([], ""));
        }}
      />
      {isLoading ? (
        "Loading..."
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {books.map((book, index) => (
            <Book
              key={book.name + index}
              title={book.name}
              cover={book.cover || ""}
              path={book.path}
              id={book.id}
            />
          ))}
        </div>
      )}
    </Page>
  );
});

export default ShelfBooks;
