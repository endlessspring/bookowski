import {types} from "mobx-state-tree";


const Author = types.model({
    id: types.identifierNumber,
    title: types.maybeNull(types.string),
})

export default Author;