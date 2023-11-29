import React from 'react'
import AvatarBox from '@/app/components/AvatarBox'
import Image from 'next/image';

import { GoKebabHorizontal } from "react-icons/go";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { GoHeartFill, GoHeart } from "react-icons/go";
import { FiMessageCircle } from "react-icons/fi";
import { Post, User } from '@prisma/client'

interface CardPostProps {
  post: any
}

const CardPost: React.FC<CardPostProps> = ({
  post
}) => {
  return (
    <div className="text-white p-4 lg:p-8">
      <div className="border-[1px] rounded-lg space-y-3 bg-darkGray w-full max-w-2xl p-2 lg:p-4">
        <div className="flex items-center justify-between">
          <AvatarBox user={post.user} />
          <div className="cursor-pointer text-white transition hover:text-purple">
            <GoKebabHorizontal size={22} />
          </div>
        </div>

        <div>
          <Image
            src={post.photo[0]}
            width={700}
            height={700}
            className="object-cover rounded-lg"
            alt='postImage'
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-white hover:text-purple transition cursor-pointer">
            <IoBookmarkOutline size={23} />
          </div>
          <div className="flex items-center gap-3">
            <FiMessageCircle className="text-white hover:text-sky-700 transition cursor-pointer" size={23} />
            <div className="flex items-center gap-1">
              <span className="text-sm">
                {post.like}
              </span>
              <GoHeart size={23} className="text-white hover:text-rose-700 transition cursor-pointer" />
            </div>
          </div>
        </div>

        <div>
          <p className="text-white text-base mt-2">
            {post.caption}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CardPost
