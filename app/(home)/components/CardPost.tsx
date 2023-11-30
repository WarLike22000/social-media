"use client"

import React, { useEffect, useState } from 'react'
import AvatarBox from '@/app/components/AvatarBox'
import Image from 'next/image';

import { GoKebabHorizontal } from "react-icons/go";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { GoHeartFill, GoHeart } from "react-icons/go";
import { FiMessageCircle } from "react-icons/fi";
import { Post, User } from '@prisma/client'
import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

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
            <GoKebabHorizontal size={22} />
          </div>
        </div>

        <div>
          {post.photo != 0 && (
            <Image
              src={post.photo[0]}
              width={700}
              height={700}
              className="object-cover rounded-lg"
              alt='postImage'
            />
          )}
        </div>

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
                <GoHeartFill  size={23} className="text-rose-700 transition cursor-pointer" />: 
                <GoHeart  size={23} className="text-rose-700 transition cursor-pointer" />
               }
            </div>
          </div>
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
