import React from "react";
import { Route, Routes} from "react-router-dom";


import ShelfSearch from "./shelf.search";
import ShelfNotes from "./shelf.notes";
import ShelfCollections from "./shelf.collections";
import ShelfBooks from "./shelf.books";

import './style.scss'   

type Props = {}

const Shelf: React.FC<Props> = () => {
    return (
        <div className={'bb-shelf'}>
            <Routes >
                <Route path={'/books'} element={<ShelfBooks />}/>
                <Route path={'/notes'} element={<ShelfNotes/>}/>
                <Route path={'/collections'} element={<ShelfCollections/>}/>
                <Route path={'/search'} element={<ShelfSearch/>}/>
            </Routes>
        </div>
    )
}

export default Shelf