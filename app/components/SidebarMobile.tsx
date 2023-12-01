"use client"

import React from 'react'
import Link from 'next/link'

import { User } from '@prisma/client'
import { Avatar } from 'antd'
import { usePathname } from 'next/navigation'
import { GrHomeRounded } from 'react-icons/gr'
import { LuImagePlus } from 'react-icons/lu'
import { IoBookmarkOutline } from "react-icons/io5";

interface SidebarDesktopProps {
  currentUser?: User | null;
}

const SidebarMobile: React.FC<SidebarDesktopProps> = ({
  currentUser
}) => {

  const pathname = usePathname();
  
  const routes = [
    {
        label: "خانه",
        icon: <GrHomeRounded size={23} className={`group-hover:text-white ${pathname === "/" ? "text-white" : "text-purple"}`} />,
        href: "/",
        active: pathname === "/"
    },
    {
        label: "ایجاد پست",
        icon: <LuImagePlus size={23} className={`group-hover:text-white ${pathname === "/create/new" ? "text-white" : "text-purple"}`} />,
        href: "/create/new",
        active: pathname === "/create/new"
    },
    {
      label: "ذخیره ها",
      icon: <IoBookmarkOutline size={23} className={`group-hover:text-white ${pathname === "/save" ? "text-white" : "text-purple"}`} />,
      href: "/save",
      active: pathname === "/save"
  },
]
  
  return (
    <div className='flex md:hidden fixed bottom-0 w-full bg-dark border-t z-10'>
      <div className='p-2 w-full flex items-center justify-between gap-2'>
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={`p-3 group rounded-xl text-white w-fit flex flex-col gap-4 hover:bg-purple transition-all cursor-pointer text-lg
                        ${route.active && "bg-purple text-white"}
            `}
          >
            <div>
              {route.icon}
            </div>
          </Link>
        ))}

        <Link href={`/profile`} className="cursor-pointer">
          <Avatar src={currentUser?.image || "/images/placeholder.jpg"} size={'large'}  />
        </Link>
      </div>
    </div>
  )
}

export default SidebarMobile
