import { readBinaryFile } from "@tauri-apps/api/fs";
import { flow, types } from "mobx-state-tree";

export const BookModel = types
  .model({
    id: types.maybeNull(types.number),
    name: types.string,
    cover: types.maybeNull(types.string),
    path: types.string,
    readingProgress: types.optional(types.number, 0),
  })
  .actions((self) => {
    const getBufferArray: () => Promise<ArrayBuffer> = flow(function* () {
      return (yield readBinaryFile(self?.path)).buffer;
    });

    return { getBufferArray };
  });
