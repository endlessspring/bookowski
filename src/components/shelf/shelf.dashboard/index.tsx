import classNames from "classnames";
import { observer } from "mobx-react-lite";
import React, { useRef } from "react";
import { useMst } from "../../../hooks/useStore";
import Book from "../shared/book";
import Page from "../shared/page";

import "./style.scss";

const ShelfDashboard = observer(() => {
  const {
    bookStore: { sortByLastOpened },
  } = useMst();

  return (
    <Page title="Читаю сейчас" toolbar={<div></div>}>
      <div className={classNames("bb-shelf-dashboard")}>
        {sortByLastOpened().map(
          (book, index) =>
            index < 4 && <Book key={book.title + book.id} book={book} />
        )}
      </div>
    </Page>
  );
});

export default ShelfDashboard;
