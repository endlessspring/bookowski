import React from 'react';
import classNames from "classnames";

import SidebarHeader from "./sidebar.header";

import SidebarSection from "./sidebar.section";
import SidebarOption from "./sidebar.option";

import "./sidebar.scss";

type Props = {}


const Sidebar: React.FC<Props> = () => {

    return (
        <div className={classNames("bb-sidebar")}>
            <SidebarHeader/>
            <SidebarSection title={'Книги'}>
                <SidebarOption label={'Читаю сейчас'} link={'/shelf/reading'}/>
                <SidebarOption label={'Хочу прочесть'} />
            </SidebarSection>
            <SidebarSection title={'Библиотека'}>
                <SidebarOption label={'Все'} link={'/shelf/books'}/>
                <SidebarOption label={'Мои заметки'} link={'/shelf/notes'}/>
            </SidebarSection>
            <SidebarSection title={'Коллекции'}>
                <SidebarOption label={'Новая коллекция'}/>
            </SidebarSection>

        </div>
    )
}

export default Sidebar;