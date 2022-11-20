import { readBinaryFile } from "@tauri-apps/api/fs";
import { flow, Instance, types } from "mobx-state-tree";
import AuthorModel from "./Author.model";

export type BookModel = Instance<typeof BookModel>;

export const BookModel = types
  .model({
    id: types.maybeNull(types.number),
    title: types.optional(types.string, ""),
    author: types.maybeNull(AuthorModel),
    path: types.string,
    location: types.maybe(types.string),
    coverUrl: types.optional(types.string, ""),
    cover: types.maybeNull(types.string),
    isLoading: false,
  })

  .actions((self) => {
    const setLocation = (location: string | number) => {
      self.location = String(location);
    };
    const getCover = flow(function* () {
      // FIXME: Получать url обложки без загрузки файла напрямую через локальный путь
      return yield readBinaryFile(self.coverUrl).then((r) =>
        URL.createObjectURL(new Blob([r.buffer]))
      );
    });
    const getBufferArray: () => Promise<ArrayBuffer> = flow(function* () {
      return (yield readBinaryFile(self?.path)).buffer;
    });

    const init = flow(function* () {
      self.isLoading = true;
      try {
        self.cover = yield getCover();
      } catch (e) {
        
        return Promise.reject(
          `Something went wrong while book ${self.title} loading`,
        );
      } finally {
        self.isLoading = false;
      }
    });

    const afterCreate = flow(function* () {
      yield init();
    });

    return { afterCreate, setLocation, getBufferArray, getCover };
  });
