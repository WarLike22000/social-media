"use client"

import React, { useEffect, useState } from 'react'
import AvatarBox from '@/app/components/AvatarBox'
import Image from 'next/image';
import axios from 'axios';
import toast from 'react-hot-toast';

import { GoKebabHorizontal } from "react-icons/go";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { GoHeartFill, GoHeart } from "react-icons/go";
import { FiMessageCircle } from "react-icons/fi";
import { LuImagePlus } from "react-icons/lu";
import { FaTrash } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Post, User } from '@prisma/client'
import { useRouter } from 'next/navigation';
import { Carousel } from 'antd';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import Link from 'next/link';

interface CardPostProps {
  post: any;
  currentUser: User | null;
  users: User[]

}

const CardPost: React.FC<CardPostProps> = ({
  post,
  currentUser,
  users
}) => {

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true)
  }, []);

  if(!mounted) {
    return null
  }
  
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/post/${post.id}`)
      .then(() => {
        toast.success("پست با موفقیت حذف شد")
        router.refresh()
      })
    } catch (error) {
      toast.error("failed delete post")
    }
  }
  
  const items: MenuProps['items'] = [
    {
      icon: <LuImagePlus className="text-sky-600" size={19} />,
      label: <Link className="font-vazir" href={`/create/${post.id}`}>ویرایش پست</Link>,
      key: '0',
    },
    {
      type: 'divider',
    },
    {
      icon: <FaTrash className="text-rose-600" size={19} />,
      label: <div onClick={handleDelete} className="font-vazir">
        حذف پست
      </div>,
      key: '1',
    },
  ];
  
  const router = useRouter();
  
  const isLiked = currentUser?.likedPost.find((id) => id == post.id)
  const postLiked = users.filter((user) => user.likedPost.find((id) => id == post.id))
  const postSaved = users.filter((user) => user.saves.find((id) => id == post.id))
  
  const likeHandler = async () => {
    try {
      
      if(!isLiked) {
        await axios.patch(`/api/favorite/${post.id}`, {
          status: "add"
        })
      } else {
        await axios.patch(`/api/favorite/${post.id}`, {
          status: "remove"
        })
      }
       router.refresh()
    } catch (error) {
      toast.error("like failed")
    }
  };

  const handleSave = async () => {
    try {
      if(postSaved.length === 0) {
        await axios.patch(`/api/save/${post.id}`, {
          status: "add"
        })
      } else {
        await axios.patch(`/api/save/${post.id}`, {
          status: "remove"
        })
      }
       router.refresh()
    } catch (error) {
      toast.error("save failed")
    }
  }
  
  return (
    <div className="text-white p-4 lg:p-8">
      <div className="border-[1px] rounded-lg space-y-3 bg-darkGray w-full max-w-2xl p-2 lg:p-4">
        <div className="flex items-center px-2 justify-between">
          <AvatarBox user={post.user} />
          <div className="cursor-pointer text-white transition hover:text-purple">
            {currentUser?.id == post.user.id && (
              <Dropdown  className="bg-darkGray" menu={{ items }} placement='bottomLeft' trigger={[ "click" ]}>
                <GoKebabHorizontal size={22} />
              </Dropdown>
            )}
          </div>
        </div>

        <Carousel>
          {post.photo != 0 && (
            post.photo.map((photo: string) => (
              <div className="max-h-96 overflow-hidden rounded-lg mx-auto">
                <Image
                  src={photo}
                  width={700}
                  height={700}
                  className="object-cover"
                  alt='postImage'
                />
              </div>
            ))
          )}
        </Carousel>

        <div className="flex items-center justify-between">
          <div onClick={handleSave} className="text-white hover:text-purple transition cursor-pointer">
            {currentUser?.saves.includes(post.id) ? 
            <IoBookmark size={23} /> : 
            <IoBookmarkOutline size={23} />}
          </div>
          <div className="flex items-center gap-3">
            <FiMessageCircle className="text-white hover:text-sky-700 transition cursor-pointer" size={23} />
            <div onClick={likeHandler} className="flex items-center gap-1">
              <span className="text-sm">
                {postLiked.length}
              </span>
               {currentUser?.likedPost.includes(post.id) ? 
                <GoHeartFill  size={23} className="text-rose-700 hover:text-rose-500 transition cursor-pointer" />: 
                <GoHeart  size={23} className="text-rose-700 hover:text-rose-500 transition cursor-pointer" />
               }
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <FaLocationDot size={15} />
          <p className="text-sm">
            {post.location}
          </p>
        </div>

        <div>
          <p className="text-white text-base mt-2">
            {post.caption}
          </p>
        </div>

        {post.tags && (
          <div className="flex flex-wrap gap-2 items-center text-sky-500 cursor-pointer">
            {post.tags.split("#").map((tag: string) => (
              <p>
                {tag}#
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CardPost
