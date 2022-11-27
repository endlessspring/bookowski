import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { createI18n } from "./i18n";
import Sidebar from "./components/sidebar";
import Shelf from "./components/shelf";
import Reader from "./components/reader";

import "./App.scss";

createI18n();

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/reader/:id" element={<Reader />} />
          <Route
            path="/*"
            element={
              <React.Fragment>
                <Sidebar />
                <Shelf />
              </React.Fragment>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
