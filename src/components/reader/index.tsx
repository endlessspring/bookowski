import { convertFileSrc } from "@tauri-apps/api/tauri";
import { observer } from "mobx-react-lite";
import React, { useMemo } from "react";
import { ReactReader } from "react-reader";
import { useParams } from "react-router-dom";
import { useMst } from "../../hooks/useStore";

import "./style.scss";

const Reader: React.FC = observer(() => {
  const { id } = useParams<{ id: string }>();
  const { bookStore } = useMst();

  const book = useMemo(
    () => bookStore.getBookById(Number(id)),
    [bookStore.books.length]
  );

  return (
    <div className="bb-reader">
      <div className="bb-reader-header"></div>
      <div className="bb-reader-content">
        {book?.path && (
          <ReactReader
            locationChanged={book?.setLocation}
            location={book?.location}
            url={convertFileSrc(book?.path)}
          />
        )}
      </div>
      <div className="bb-reader-footer"></div>
    </div>
  );
});
export default Reader;
