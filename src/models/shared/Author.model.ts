import { types } from "mobx-state-tree";

const AuthorModel = types.model({
  name: types.maybeNull(types.string),
});
export default AuthorModel;
