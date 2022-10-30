import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { observer } from "mobx-react-lite";
import ShelfSearch from "./shelf.search";
import ShelfNotes from "./shelf.notes";
import ShelfCollections from "./shelf.collections";
import ShelfBooks from "./shelf.books";
import { WebviewWindow } from "@tauri-apps/api/window";

import "./style.scss";
import { useStore } from "../../hooks/useStore";

type Props = {};

const Shelf: React.FC<Props> = observer(() => {
  return (
    <div className={"bb-shelf"}>
      <Routes>
        <Route path={"/shelf/books"} element={<ShelfBooks />} />
        <Route path={"/shelf/notes"} element={<ShelfNotes />} />
        <Route path={"/shelf/collections"} element={<ShelfCollections />} />
        <Route path={"/shelf/search"} element={<ShelfSearch />} />
      </Routes>
    </div>
  );
});

export default Shelf;
