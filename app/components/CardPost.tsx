"use client"

import React, { useEffect, useState } from 'react'
import AvatarBox from '@/app/components/AvatarBox'
import Image from 'next/image';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Button from './Button';

import { GoKebabHorizontal } from "react-icons/go";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { GoHeartFill, GoHeart } from "react-icons/go";
import { FiMessageCircle } from "react-icons/fi";
import { LuImagePlus } from "react-icons/lu";
import { FaTrash, FaPlus } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Post, User } from '@prisma/client'
import { useRouter } from 'next/navigation';
import { Carousel, MenuProps, Dropdown } from 'antd';

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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMounted(true)
  }, []);

  if(!mounted) {
    return null
  }
  
  
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/post/${post?.id}`)
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
      label: <Link className="font-vazir" href={`/create/${post?.id}`}>ویرایش پست</Link>,
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

  
  const isLiked = currentUser?.likedPost.find((id) => id == post?.id)
  const postLiked = users.filter((user) => user.likedPost.find((id) => id == post?.id))
  const postSaved = users.filter((user) => user.saves.find((id) => id == post?.id))
  
  const likeHandler = async () => {
    try {
      
      if(!isLiked) {
        await axios.patch(`/api/favorite/${post?.id}`, {
          status: "add"
        })
      } else {
        await axios.patch(`/api/favorite/${post?.id}`, {
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
        await axios.patch(`/api/save/${post?.id}`, {
          status: "add"
        })
      } else {
        await axios.patch(`/api/save/${post?.id}`, {
          status: "remove"
        })
      }
       router.refresh()
    } catch (error) {
      toast.error("save failed")
    }
  }

  const followHandler = async () => {
    try {
      setIsLoading(true);

      await axios.patch("/api/follow", {
        userId: post?.user?.id
      })
      .then(() => {
        router.refresh();
      })
    } catch (error) {
      toast.error("دنبال کردن با شکست مواجه شد")
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <>
      <div className="text-white p-4 lg:p-8">
        <div className="border-[1px] rounded-lg space-y-3 bg-darkGray w-full max-w-xl p-2 lg:p-4">
          <div className="flex items-center px-2 justify-between">
            <AvatarBox user={post?.user} />
            <div className="cursor-pointer text-white transition hover:text-purple">
              {currentUser?.id == post?.user?.id && (
                <Dropdown  className="bg-darkGray" menu={{ items }} placement='bottomLeft' trigger={[ "click" ]}>
                  <GoKebabHorizontal size={22} />
                </Dropdown>
              )}
            </div>
            {
              currentUser?.id != post?.user?.id && !currentUser?.following.includes(post?.user?.id) && (
                <div>
                  <Button onClick={followHandler} disabled={isLoading} purple className="flex items-center gap-2">
                    دنبال کردن
                    <FaPlus />
                  </Button>
                </div>
              )
            }
          </div>

          <div className="mx-auto h-fit overflow-hidden rounded-lg">
            <Carousel swipeToSlide draggable className="outline-none w-full h-full" dots={{className: "bg-purple/30 p-2 rounded-r-lg w-fit mx-auto"}}>
              {post?.photo != 0 && (
                post?.photo.map((photo: string) => (
                  <div className="w-full h-full">
                    <Image
                      src={photo}
                      width={600}
                      height={600}
                      className="object-cover"
                      alt='postImage'
                    />
                  </div>
                ))
              )}
            </Carousel>
          </div>

          <div className="flex items-center justify-between">
            <div onClick={handleSave} className="text-white hover:text-purple transition cursor-pointer">
              {currentUser?.saves.includes(post?.id) ? 
              <IoBookmark size={23} /> : 
              <IoBookmarkOutline size={23} />}
            </div>
            <div className="flex items-center gap-3">
              <div onClick={likeHandler} className="flex items-center gap-1">
                <span className="text-sm">
                  {postLiked.length}
                </span>
                {currentUser?.likedPost.includes(post?.id) ? 
                  <GoHeartFill  size={23} className="text-rose-700 hover:text-rose-500 transition cursor-pointer" />: 
                  <GoHeart  size={23} className="text-rose-700 hover:text-rose-500 transition cursor-pointer" />
                }
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <FaLocationDot size={15} />
            <p className="text-sm">
              {post?.location}
            </p>
          </div>

          <div>
            <p className="text-white text-base mt-2">
              {post?.caption}
            </p>
          </div>

          {post?.tags && (
            <div className="flex flex-wrap gap-2 items-center text-sky-500 cursor-pointer">
              {post?.tags.split("،").map((tag: string) => (
                <p>
                  {tag}#
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default CardPost
