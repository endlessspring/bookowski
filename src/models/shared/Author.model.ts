import { types } from "mobx-state-tree";

export const AuthorModel = types.model({
  name: types.string,
});
