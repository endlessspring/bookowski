import { readBinaryFile } from "@tauri-apps/api/fs";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { WebviewWindow } from "@tauri-apps/api/window";
import { type } from "epubjs/types/utils/core";

import { flow, getRoot, Instance, types } from "mobx-state-tree";
import { nanoid } from "nanoid";
import { RootStoreInstance } from "../Root.store";
import AuthorModel from "./Author.model";

export type BookModel = Instance<typeof BookModel>;

export const BookModel = types
  .model({
    id: types.identifierNumber,
    title: types.optional(types.string, ""),
    author: types.maybeNull(AuthorModel),
    path: types.string,
    location: types.maybe(types.string),
    coverUrl: types.optional(types.string, ""),
    cover: types.maybeNull(types.string),
    lastOpened: types.maybeNull(types.Date),
    isLoading: false,
  })

  .actions((self) => {
    const rootStore = getRoot<RootStoreInstance>(self);

    const setLocation = (location: string | number) => {
      self.location = String(location);
    };
    const setLastOpened = (datetime: Date) => {
      self.lastOpened = datetime;
    };

    const getCover = () => {
      return convertFileSrc(self.coverUrl);
    };
    const getBufferArray: () => Promise<ArrayBuffer> = flow(function* () {
      return (yield readBinaryFile(self?.path)).buffer;
    });

    const openInNewWindow = () => {
      const { storeBooksStore } = rootStore.bookStore;

      new WebviewWindow(nanoid(7), {
        url: `/reader/${self.id}`,
        title: self.title,
      });

      setLastOpened(new Date());
      storeBooksStore();
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
      setLastOpened,
      getBufferArray,
      getCover,
      openInNewWindow,
    };
  });
