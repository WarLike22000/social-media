import React from 'react'
import SidebarDesktop from './SidebarDesktop';
import SidebarMobile from './SidebarMobile';
import getCurrentUser from '../actions/getCurrentUser';

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = async ({
  children
}) => {

  const currentUser = await getCurrentUser();
  
  return (
    <div className="flex w-full h-[100vh]">
      <SidebarDesktop currentUser={currentUser} />
      <SidebarMobile currentUser={currentUser} />
      {children}
    </div>
  )
}

export default Sidebar;
