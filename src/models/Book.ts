import {types} from "mobx-state-tree";
import Author from "./Author";


const Book = types.model({
    id: types.identifierNumber,
    title: types.maybeNull(types.string),
    date: types.maybeNull(types.Date),
    author: types.safeReference(Author),
    series: types.maybeNull(types.string),
    ISBN: types.maybeNull(types.string),
    meta: types.model({
        extension: types.maybeNull(types.enumeration(['pdf', 'fb2', 'zip', 'epub']))
    })
})

export default Book;