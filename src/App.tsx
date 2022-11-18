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
  const { bookStore } = useMst();

  useEffect(() => {
    bookStore.scanLibrary();
  }, []);

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

interface Strategy {
  authenticate(args: any[]): boolean;
}

class TwitterStrategy implements Strategy {
  authenticate(args: any[]) {
    const [token] = args;

    if (token !== "tw123") {
      console.error("Аутентификация с помощью аккаунта Twitter провалилась!");
      return false;
    }

    console.log("Аутентификация с помощью аккаунта Twitter выполнена успешно!");

    return true;
  }
}

export default App;
