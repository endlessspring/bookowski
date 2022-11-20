import { BaseDirectory, readBinaryFile } from "@tauri-apps/api/fs";
import { cast, flow, types } from "mobx-state-tree";
import { Book } from "epubjs";

import FsModel from "./shared/FS.model";
import { BookModel } from "./shared/Book.model";

// FIXME: При Добавлении новой книги, обложка подгружается только после перезагрузки
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
      yield library?.addFile(file);
      //FIXME: Не сканировать всю папку, а добавлять единично
      yield scanLibrary();
    });

    const addBook = (book: BookModel) => {
      if (self.getBookByName(book.title)) return;
      self.books.push(book);
    };

    const getBookData = flow(function* (path: string) {
      const bookBuffer = (yield readBinaryFile(path)).buffer;
      const book = new Book(bookBuffer);

      const coverUrl = yield book.coverUrl();
      const metadata = yield book.loaded.metadata;

      // FIXME: Не добавлять файл если он уже существует
      yield fetch(coverUrl).then(async (r) => {
        covers.addFile(new File([await r.blob()], `${metadata.title}.png`));
      });

      return {
        id: Math.round(Math.random() * 100000),
        title: metadata.title,
        path,
        // FIXME: Получать путь не перебирая весь массив
        coverUrl: covers.fuzzyFindFileByName(metadata.title)?.path,
      };
    });

    const storeBooks = () => {
      localStorage.setItem("books", JSON.stringify(self.books));
    };

    const restoreBooks = () => {
      const copy = localStorage.getItem("books");

      if (copy) {
        self.books = cast(JSON.parse(copy));
      }
    };

    const scanLibrary = flow(function* () {
      const { files } = library;

      self.isLoading = true;
      try {
        //FIXME: Не ждать пока загрузятся все книги, а добалять по одной
        const books = yield Promise.all(
          files.map((file) => getBookData(file.path))
        );

        books.forEach((book: BookModel) => addBook(book));
      } catch (e) {
        return Promise.reject(e);
      } finally {
        self.isLoading = false;
        storeBooks();
      }
    });

    const init = flow(function* () {
      yield library.createDirectory();
      yield library.scanFiles();

      yield covers.createDirectory();
      yield covers.scanFiles();

      if (!self.books.length) {
        yield scanLibrary();
      }
    });

    const afterCreate = flow(function* () {
      restoreBooks();
      yield init();
    });

    return { afterCreate, addBookFile: addNewBookFile, scanLibrary };
  });

export default BooksStore;
