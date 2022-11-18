import { BaseDirectory, readBinaryFile } from "@tauri-apps/api/fs";
import { cast, flow, getRoot, types } from "mobx-state-tree";
import { Book } from "epubjs";

import FsModel from "./shared/FS.model";
import { BookModel } from "./shared/Book.model";

const BooksStore = types
  .model({
    isLoading: false,
    books: types.optional(types.array(BookModel), []),
    fs: types.optional(
      FsModel.props({
        baseDirectory: BaseDirectory.Document,
        baseFolder: "booklyLib/library",
      }),
      {}
    ),
  })
  .views((self) => {
    const getBookByName = (name: string) => {
      return self.books.find((item) => item.title === name);
    };

    const getBookByPath = (path: string) => {
      return self.books.find((item) => item.path === path);
    };

    const getBookById = (id: number) => {
      return self.books.find((item) => item.id === id);
    };

    return {
      getBookByName,
      getBookByPath,
      getBookById,
    };
  })
  .actions((self) => {
    const root = getRoot(self);

    const { fs } = self;

    const addNewBookFile = flow(function* (file: File) {
      yield fs?.addFile(file);
      yield scanLibrary();
    });

    const getBookData = flow(function* (path: string) {
      const bookBuffer = (yield readBinaryFile(path)).buffer;
      const book = new Book(bookBuffer);

      const metadata = yield book.loaded.metadata;

      return {
        id: Math.round(Math.random() * 100000),
        title: metadata.title,
        path,
      };
    });

    const scanLibrary = flow(function* () {
      const { files } = fs;
      self = cast(JSON.parse(localStorage.getItem("bookly") || "").bookStore);

      self.isLoading = true;
      try {
        const books = yield Promise.all(
          files.map((file) => getBookData(file.path))
        );

        self.books = cast(books);
      } catch (e) {
        return Promise.reject(e);
      } finally {
        self.isLoading = false;
        localStorage.setItem("bookly", JSON.stringify(root));
      }
    });

    const afterCreate = () => {
      fs?.createDirectory();
      fs?.scanFiles();
    };

    return { afterCreate, addBookFile: addNewBookFile, scanLibrary };
  });

export default BooksStore;
