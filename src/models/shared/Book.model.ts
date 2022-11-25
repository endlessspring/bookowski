import { readBinaryFile } from "@tauri-apps/api/fs";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { WebviewWindow } from "@tauri-apps/api/window";

import { flow, Instance, types } from "mobx-state-tree";
import { nanoid } from "nanoid";
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
    const getCover = () => {
      return convertFileSrc(self.coverUrl);
    };
    const getBufferArray: () => Promise<ArrayBuffer> = flow(function* () {
      return (yield readBinaryFile(self?.path)).buffer;
    });

    const openInNewWindow = () => {
      new WebviewWindow(nanoid(7), {
        url: `/reader/${self.id}`,
        title: self.title,
      });
    };

    const init = () => {
      self.isLoading = true;
      try {
        self.cover = getCover();
      } catch (e) {
        return Promise.reject(
          `Something went wrong while book ${self.title} loading`
        );
      } finally {
        self.isLoading = false;
      }
    };

    const afterCreate = () => {
      init();
    };

    return {
      afterCreate,
      setLocation,
      getBufferArray,
      getCover,
      openInNewWindow,
    };
  });
