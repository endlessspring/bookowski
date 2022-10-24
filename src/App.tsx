import React, { useEffect } from "react";
import { createI18n } from "./i18n";

import Sidebar from "./components/sidebar";
import Shelf from "./components/shelf";

import "./App.scss";
import { BrowserRouter } from "react-router-dom";

createI18n();

function App() {  
    
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
