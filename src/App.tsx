import React, { useEffect } from "react";

import Sidebar from "./components/sidebar";
import Shelf from "./components/shelf";
import { createI18n } from "./i18n";

import "./App.scss";
import { BrowserRouter } from "react-router-dom";

import { copyFile, BaseDirectory, readDir, Dir } from "@tauri-apps/api/fs";
import { useStore } from "./hooks/useStore";

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
