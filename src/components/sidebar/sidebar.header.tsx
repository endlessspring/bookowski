import React from 'react';

import './sidebar.header.scss'

type Props = {}

const SidebarHeader: React.FC<Props> = () => {
  return (
    <div className='bb-sidebar-header'>
      <input type="text" placeholder='Поиск' className='bb-sidebar-search' />
    </div>
  )
}


export default SidebarHeader
