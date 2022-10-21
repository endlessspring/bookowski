import React from "react";

import './sidebar.option.scss';
import {NavLink} from "react-router-dom";
import classNames from "classnames";

type Props = {
    label: string,
    link?: string
};

const SidebarOption: React.FC<Props> = ({label, link}) => {
    return (
        <NavLink to={link || ''}>
            {({isActive}) => (
                <div className={classNames({'bb-sidebar-option': true, 'bb-sidebar-option--active': isActive && link})}>
                    <div className="bb-sidebar-option-label">
                        {label}
                    </div>
                </div>
            )}

        </NavLink>

    )
};

export default SidebarOption;