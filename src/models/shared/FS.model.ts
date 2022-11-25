import { cast, flow, types } from "mobx-state-tree";
import {
  BaseDirectory,
  readDir,
  createDir,
  writeBinaryFile,
  FileEntry,
} from "@tauri-apps/api/fs";

const FsModel = types
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
  .views((self) => {
    const fuzzyFindFileByName = (search_string: string) => {
      return self.files.find((file) => file.name.includes(search_string));
    };

    return { fuzzyFindFileByName };
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

      return entries;
    });

    const addFile = flow(function* (file: File) {
      if (!file) return;

      const fileBuffer = yield file.arrayBuffer();

      yield writeBinaryFile(`${baseFolder}/${file.name}`, fileBuffer, {
        dir: baseDirectory,
      });

      // FIXME: Не сканировать всю папку, а добавлять единично
      yield scanFiles();
      return self.fuzzyFindFileByName(file.name) as FileEntry;
    });

    const createDirectory = flow(function* () {
      yield createDir(baseFolder, {
        dir: baseDirectory,
        recursive: true,
      });
    });

    return { createDirectory, addFile, scanFiles };
  });

export default FsModel;
