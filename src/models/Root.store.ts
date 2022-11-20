import { Instance, types } from "mobx-state-tree";

import BooksStore from "./Books.store";

export type RootStoreInstance = Instance<typeof RootStore>;

const RootStore = types.model({
  bookStore: types.optional(BooksStore, {}),
});

export default RootStore.create();
