import React from 'react';
import classNames from "classnames";

import './sidebar.section.scss';

type Props = {
    title: string,
    children: any
};


const SidebarSection: React.FC<Props> = ({title, children},) => {
    return (
        <div className={classNames('bb-sidebar-section')}>
            <div className="section-title">{title}</div>
            <div className="section-content">
                {children}
            </div>
        </div>
    )
}

export default SidebarSection;