import React, { useEffect } from "react";
import { createI18n } from "./i18n";

import Sidebar from "./components/sidebar";
import Shelf from "./components/shelf";

import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import { useStore } from "./hooks/useStore";

createI18n();

function App() {  
  const { bookStore } = useStore();

  useEffect(() => {
    bookStore.scanLibrary()
  }, [])
  
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar />
        <Shelf />
      </BrowserRouter>
    </div>
  );
}

export default App;
