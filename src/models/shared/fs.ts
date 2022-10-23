import { cast, flow, types } from "mobx-state-tree";
import {
  BaseDirectory,
  readDir,
  createDir,
  writeBinaryFile,
} from "@tauri-apps/api/fs";

const FS = types
  .model({
    files: types.optional(
      types.array(
        types.model({
          name: types.string,
          path: types.string,
        })
      ),
      []
    ),
  })
  .props({
    baseDirectory: types.maybeNull(
      types.enumeration(
        "BaseDirectory",
        Object.values(BaseDirectory).map((i) => i.toString())
      )
    ),
    baseFolder: types.optional(types.string, ""),
  })
  .actions((self) => {
    const { baseFolder } = self;
    const baseDirectory = self.baseDirectory as unknown as BaseDirectory;

    const scanFiles = flow(function* () {
      const entries: Array<{ path: string; name: string }> = yield readDir(
        baseFolder,
        { dir: baseDirectory }
      );

      self.files = cast(entries);
    });

    const addFile = flow(function* (file: File) {
      if (!file) return;

      const fileBuffer = yield file.arrayBuffer();

      yield writeBinaryFile(`${baseFolder}/${file.name}`, fileBuffer, {
        dir: baseDirectory,
      });

      yield scanFiles();
    });

    const createDirectory = flow(function* () {
      yield createDir(baseFolder, {
        dir: baseDirectory,
        recursive: true,
      });
    });

    return { createDirectory, addFile, scanFiles };
  });

export default FS;
