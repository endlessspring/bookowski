import { Book } from "epubjs";
import { readBinaryFile } from "@tauri-apps/api/fs";
import { flow, Instance, types } from "mobx-state-tree";

export type BookModel = Instance<typeof BookModel>;

export const BookModel = types
  .model({
    id: types.maybeNull(types.number),
    title: types.optional(types.string, ""),
    cover: types.maybeNull(types.string),
    path: types.string,
    readingProgress: types.optional(types.number, 0),
    location: types.maybe(types.string),
  })
  .actions((self) => {
    const getBufferArray: () => Promise<ArrayBuffer> = flow(function* () {
      return (yield readBinaryFile(self?.path)).buffer;
    });

    const setLocation = (location: string | number) => {
      self.location = String(location);
    };

    const afterCreate = flow(function* () {
      const bookBuffer = (yield readBinaryFile(self.path)).buffer;
      const book = new Book(bookBuffer);

      self.cover = yield book.coverUrl();
    });

    return { getBufferArray, setLocation, afterCreate };
  });
