import { convertFileSrc } from "@tauri-apps/api/tauri";
import { BaseDirectory, FileEntry, readBinaryFile } from "@tauri-apps/api/fs";
import { cast, flow, types } from "mobx-state-tree";
import { Book } from "epubjs";

import FsModel from "./shared/FS.model";
import { BookModel } from "./shared/Book.model";
import moment from "moment";

// TODO: Поддержака fb2

const BooksStore = types
  .model({
    isLoading: false,
    books: types.optional(types.array(BookModel), []),
    library: types.optional(
      FsModel.props({
        baseDirectory: BaseDirectory.Document,
        baseFolder: "booklyLib/library",
      }),
      {}
    ),
    covers: types.optional(
      FsModel.props({
        baseDirectory: BaseDirectory.Document,
        baseFolder: "booklyLib/covers",
      }),
      {}
    ),
  })
  .views((self) => {
    const getLastOpened = () => {
      return self.books
        .filter((item) => item.lastOpened)
        .concat()
        .sort(
          (a, b) => moment(b.lastOpened).unix() - moment(a.lastOpened).unix()
        );
    };

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
      sortByLastOpened: getLastOpened,
    };
  })
  .views((self) => {
    return {
      get authors() {
        return self.books
          .filter((item) => item.author)
          .map((item) => item.author);
      },
    };
  })
  .actions((self) => {
    const { library, covers } = self;

    const addNewBookFile = flow(function* (file: File) {
      const entry = yield library?.addFile(file);

      addBook(yield getBookData(entry?.path));
      storeBooksStore();
    });

    const addBook = (book: BookModel) => {
      if (self.getBookByName(book.title)) return;
      self.books.push(book);
    };

    const getBookData = flow(function* (path: string) {
      const book = new Book(convertFileSrc(path));

      const coverUrl = yield book.coverUrl();
      const metadata = yield book.loaded.metadata;

      let coverEntry: FileEntry | undefined;
      yield fetch(coverUrl).then(async (r) => {
        coverEntry = await covers.addFile(
          new File([await r.blob()], `${metadata.title}.png`)
        );
      });

      return {
        id: Math.round(Math.random() * 100000),
        title: metadata.title,
        path,
        // FIXME: Получать путь не перебирая весь массив
        coverUrl: coverEntry?.path,
      };
    });

    const storeBooksStore = () => {
      localStorage.setItem("books", JSON.stringify(self.books));
    };

    const restoreBooksStore = () => {
      const books = localStorage.getItem("books");

      books && (self.books = cast(JSON.parse(books)));
    };

    const scanLibrary = flow(function* () {
      const { files } = library;

      self.isLoading = true;
      try {
        //FIXME: Не ждать пока загрузятся все книги, а добалять по одной
        //FIXME: Добавить валидацию форматов
        const books = yield Promise.all(
          files.map((file) => getBookData(file.path))
        );

        books.forEach((book: BookModel) => addBook(book));
      } catch (e) {
        return Promise.reject(e);
      } finally {
        self.isLoading = false;
        storeBooksStore();
      }
    });

    const init = flow(function* () {
      yield library.createDirectory();
      yield library.scanFiles();

      yield covers.createDirectory();
      yield covers.scanFiles();

      yield scanLibrary();
    });

    const afterCreate = flow(function* () {
      restoreBooksStore();
      yield init();
    });

    return {
      afterCreate,
      addBookFile: addNewBookFile,
      scanLibrary,
      storeBooksStore,
      restoreBooksStore,
    };
  });

export default BooksStore;
