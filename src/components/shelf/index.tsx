import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { observer } from "mobx-react-lite";
import ShelfSearch from "./shelf.search";
import ShelfNotes from "./shelf.notes";
import ShelfCollections from "./shelf.collections";
import ShelfBooks from "./shelf.books";

import "./style.scss";
import { useStore } from "../../hooks/useStore";

type Props = {};

const Shelf: React.FC<Props> = observer(() => {

  return (
    <div className={"bb-shelf"}>
      <Routes>
        <Route path={"/books"} element={<ShelfBooks />} />
        <Route path={"/notes"} element={<ShelfNotes />} />
        <Route path={"/collections"} element={<ShelfCollections />} />
        <Route path={"/search"} element={<ShelfSearch />} />
        <Route path="*" element={<Navigate to="/books" replace />} />
      </Routes>
    </div>
  );
});

export default Shelf;
