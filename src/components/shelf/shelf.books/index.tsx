import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../../hooks/useStore";
import Book from "../shared/book";
import Page from "../shared/page";

const ShelfBooks = observer(() => {
  const store = useStore();

  return (
    <Page title="Книги">
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <input
          type="file"
          onChange={(e) => {
            store.bookStore.addBookFile(e.target.files?.item(0));
          }}
        />
        {store.bookStore.books.map((book, index) => (
          <Book key={book.name + index} title={book.name} />
        ))}
      </div>
    </Page>
  );
});

export default ShelfBooks;
