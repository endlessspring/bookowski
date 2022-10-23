import ePub from "epubjs";
import { BaseDirectory, readBinaryFile } from "@tauri-apps/api/fs";
import { cast, flow, types } from "mobx-state-tree";
import FS from "./shared/fs";
import Epub, { Book } from "epubjs";

const BooksStore = types
  .model({
    books: types.optional(types.array(types.model({ name: types.string })), []),
    fs: types.optional(
      FS.props({
        baseDirectory: BaseDirectory.Document,
        baseFolder: "booklyLib/library",
      }),
      {}
    ),
  })
  .actions((self) => {
    const { fs } = self;

    const addBookFile = (file: File) => {
      fs?.addFile(file);
      scanLibrary();
    };

    const getBookData = flow(function* (path: string) {
      const book = new Book((yield readBinaryFile(path)).buffer);

      const metadata = yield book.loaded.metadata;

      return { name: metadata.title };
    });

    const scanLibrary = () => {
      const { files } = fs;

      console.log("scan");

      return files.map(
        flow(function* (file) {
          const book = yield getBookData(file.path);
          self.books.push(book);

        })
      );
    };

    const afterCreate = () => {
      fs?.createDirectory();
      fs?.scanFiles();
    };

    return { afterCreate, addBookFile, scanLibrary };
  });

export default BooksStore;
