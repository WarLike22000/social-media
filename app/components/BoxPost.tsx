"use client";

import axios from 'axios';
import toast from 'react-hot-toast';

import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
import Image from 'next/image';


interface BoxPostProps {
    post: any;
    currentUser: User | null;
    users: User[]
  
  }

const BoxPost: React.FC<BoxPostProps> = ({
    post,
    currentUser,
    users
}) => {

    const router = useRouter();
    
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
    
  return (
    <div className="w-full h-72 min-[480px]:w-56 min-[480px]:h-56 relative rounded-lg overflow-hidden">

        <Image
          src={post.photo[0]}
          fill
          alt='image'
          className='object-cover'
        />
      
        <div className="flex items-center gap-2 absolute bottom-2 left-2">
            <div onClick={likeHandler} className="flex items-center gap-1">
              <span className="text-sm text-purple font-bold">
                {postLiked.length}
              </span>
               {currentUser?.likedPost.includes(post?.id) ? 
                <GoHeartFill  size={23} className="text-rose-700 hover:text-rose-500 transition cursor-pointer" />: 
                <GoHeart  size={23} className="text-rose-700 hover:text-rose-500 transition cursor-pointer" />
               }
            </div>
            <div onClick={handleSave} className="text-purple hover:text-purple transition cursor-pointer">
                {currentUser?.saves.includes(post?.id) ? 
                <IoBookmark size={23} /> : 
                <IoBookmarkOutline size={23} />}
            </div>
        </div>
    </div>
  )
}

export default BoxPost
