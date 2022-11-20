import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { createI18n } from "./i18n";
import Sidebar from "./components/sidebar";
import Shelf from "./components/shelf";
import { useMst } from "./hooks/useStore";
import Reader from "./components/reader";

import "./App.scss";

createI18n();

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar />
        <Shelf />
        <Routes>
          <Route path="/reader/:id" element={<Reader />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
