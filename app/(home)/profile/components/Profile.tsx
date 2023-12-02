"use client";

import Image from 'next/image';
import Button from '@/app/components/Button';
import TabBar from './TabBar';

import { Post, User } from '@prisma/client';
import { FaRegEdit } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { HiOutlineLogout } from "react-icons/hi";
import { signOut } from 'next-auth/react';
import Link from 'next/link';

interface ProfileProps {
    currentUser?: any
    users: User[];
    likedPost: Post[];
    usersFollower?: User[] | null;
}

const Profile: React.FC<ProfileProps> = ({
    currentUser,
    users,
    likedPost,
    usersFollower
}) => {

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true)
    }, []);
  
    if(!mounted) {
      return null
    }
    
  return (
    <div className="w-full h-[100vh] p-4 lg:p-8">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full">
            <div className="flex flex-col md:flex-row items-center gap-4 text-white">
                <div>
                    <Image
                        src={currentUser?.image || "/images/placeholder.jpg"}
                        width={200}
                        height={200}
                        alt='profile-image'
                        className="rounded-full"
                    />
                </div>
                <div>
                    <h2 className="text-xl max-md:text-center lg:text-4xl">
                        {currentUser?.name}
                    </h2>
                    <p className="text-sm max-md:text-center lg:text-lg text-neutral-500">
                        {currentUser?.email}
                    </p>
                    <div className="flex flex-wrap gap-4 items-center my-2">
                        <div className="flex gap-2">
                            <span>پست ها</span>
                            <span className="text-purple">{currentUser?.posts.length}</span>
                        </div>
                        <div className="flex gap-2">
                            <span>دنبال کننده ها</span>
                            <span className="text-purple">{usersFollower?.length}</span>
                        </div>
                        <div className="flex gap-2">
                            <span>دنبال شونده ها</span>
                            <span className="text-purple">{currentUser?.following.length}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-4 flex items-center gap-2">
                <Button purple>
                    <Link className='flex items-center justify-center gap-2' href="/profile/update-user">
                        <p>
                        ویرایش پروفایل
                        </p>
                        <FaRegEdit size={15} />
                    </Link>
                </Button>
                <Button onClick={() => signOut()} className='flex items-center justify-center gap-2' red>
                    <HiOutlineLogout size={20} />
                </Button>
            </div>
        </div>

        <div className="w-full h-[100vh]">
            <TabBar currentUser={currentUser} users={users} likedPost={likedPost} />
        </div>
    </div>
  )
}

export default Profile;