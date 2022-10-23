import { type } from 'epubjs/types/utils/core';
import {Instance, types} from "mobx-state-tree";
import BooksStore from "./BooksStore";
import FS from "./shared/fs";

export type RootStoreInstance = Instance<typeof RootStore>;

const RootStore = types.model({
    bookStore: types.optional(BooksStore, {})
});

export default RootStore.create();
