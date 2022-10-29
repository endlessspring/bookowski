import { types } from "mobx-state-tree";

export const BookModel = types.model({
  name: types.string,
  cover: types.maybeNull(types.string),
  path: types.string,
  readingProgress: types.optional(types.number, 0),
});
