import { cast, Instance, types } from "mobx-state-tree";
import BooksStore from "./Books.store";

export type RootStoreInstance = Instance<typeof RootStore>;

const RootStore = types
  .model({
    bookStore: types.optional(BooksStore, {}),
  })
  .actions((self) => {
    return {
      afterCreate() {
        const copy = localStorage.getItem('bookly')
        
        if (copy) {
          self.bookStore = cast(JSON.parse(copy).bookStore)
        }
      },
    };
  });

export default RootStore.create();
