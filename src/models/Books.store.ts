import { BaseDirectory, readBinaryFile } from "@tauri-apps/api/fs";
import { cast, flow, types } from "mobx-state-tree";
import FsModel from "./shared/FS.model";
import { Book } from "epubjs";
import { BookModel } from "./shared/Book.model";
import { ask } from "@tauri-apps/api/dialog";
import { number } from "mobx-state-tree/dist/internal";

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
      return self.books.find((item) => item.name === name);
    };

    const getBookByPath = (path: string) => {
      return self.books.find((item) => item.path === path);
    };
    
    const getBookById = (id: number) => {
      return self.books.find((item) => item.id == id);
    };

    return {
      getBookByName,
      getBookByPath,
      getBookById,
    };
  })
  .actions((self) => {
    const { fs } = self;

    const addNewBookFile = flow(function* (file: File) {
      yield fs?.addFile(file);
      yield scanLibrary();
    });

    const getBookData = flow(function* (path: string) {
      const bookBuffer = (yield readBinaryFile(path)).buffer;
      const book = new Book(bookBuffer);

      const metadata = yield book.loaded.metadata;
      const cover = yield book.coverUrl();
      
      return { id: Math.random(), name: metadata.title, cover, path };
    });

    const scanLibrary = flow(function* () {
      const { files } = fs;

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
      }
    });

    const afterCreate = () => {
      fs?.createDirectory();
      fs?.scanFiles();
    };

    return { afterCreate, addBookFile: addNewBookFile, scanLibrary };
  });

export default BooksStore;
