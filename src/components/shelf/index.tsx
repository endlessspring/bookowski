import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { observer } from "mobx-react-lite";

import ShelfSearch from "./shelf.search";
import ShelfNotes from "./shelf.notes";
import ShelfCollections from "./shelf.collections";
import ShelfBooks from "./shelf.books";
import ShelfDashboard from "./shelf.dashboard";

import "./style.scss";

const Shelf: React.FC = observer(() => {
  return (
    <div className={"bb-shelf"}>
      <Routes>
        <Route path={"/shelf/dashboard"} element={<ShelfDashboard />} />
        <Route path={"/shelf/books"} element={<ShelfBooks />} />
        <Route path={"/shelf/notes"} element={<ShelfNotes />} />
        <Route path={"/shelf/collections"} element={<ShelfCollections />} />
        <Route path={"/shelf/search"} element={<ShelfSearch />} />
        <Route path="/*" element={<Navigate to="/shelf/dashboard" />} />
      </Routes>
    </div>
  );
});

export default Shelf;
