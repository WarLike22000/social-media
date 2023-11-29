"use client";

import React from 'react'
import Link from 'next/link';
import AvatarBox from './AvatarBox';

import { GrHomeRounded } from "react-icons/gr";
import { LuImagePlus } from "react-icons/lu";
import { HiOutlineLogout } from "react-icons/hi";
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { User } from '@prisma/client';

interface SidebarDesktopProps {
    currentUser?: User | null;
}

const SidebarDesktop: React.FC<SidebarDesktopProps> = ({
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
            icon: <LuImagePlus size={23} className={`group-hover:text-white ${pathname === "/create" ? "text-white" : "text-purple"}`} />,
            href: "/create",
            active: pathname === "/create"
        },
    ]
    
  return (
    <div className="hidden md:flex h-[100vh] w-full max-w-[250px] bg-darkGray">
        <div className="w-full h-full p-3 text-white">
            <div className="flex flex-col gap-5 h-full">
                <AvatarBox user={currentUser} />
                
                <div className="flex flex-col gap-3">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={`p-3 group rounded-xl text-white w-full flex gap-4 hover:bg-purple transition-all cursor-pointer text-lg
                        ${route.active && "bg-purple text-white"}
                        `}
                        >
                            {route.icon}
                            <p>
                                {route.label}
                            </p>
                        </Link>
                    ))}
                </div>

                <div onClick={() => signOut()} className="p-3 group rounded-xl text-white w-full flex gap-4 hover:bg-purple transition-all cursor-pointer text-lg mt-auto">
                    <HiOutlineLogout size={23} className="group-hover:text-white text-purple" />
                    <p>
                    خروج از حساب
                    </p>
                </div>

            </div>
        </div>
    </div>
  )
}

export default SidebarDesktop
