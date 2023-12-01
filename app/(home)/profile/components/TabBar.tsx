"use client"

import BoxPost from "@/app/components/BoxPost";
import Empty from "@/app/components/Empty";

import { Post, User } from "@prisma/client";
import { Tabs, TabsProps } from "antd";
import { LuImage } from "react-icons/lu";

interface ProfileProps {
    currentUser?: User & {
        posts: Post[]
    },
    users: User[],
    likedPost: Post[];
}

const TabBar: React.FC<ProfileProps> = ({
    currentUser,
    users,
    likedPost
}) => {
    const classStyle = "font-vazir flex gap-2 items-center text-base md:text-xl text-white hover:text-purple transition mx-3"

    const items: TabsProps['items'] = [
        {
          key: '1',
          label: (
            <span className={classStyle}>
              <LuImage />
              <p>پست ها</p>
            </span>
          ) ,
          children: (
            <div className="flex flex-wrap gap-2 w-full h-[100vh] font-vazir">
              {currentUser?.posts.length === 0 && <Empty text='پستی ایجاد نشده' />}
              {currentUser?.posts.map((post) => (
                <BoxPost
                  key={post.id}
                  post={post}
                  currentUser={currentUser!}
                  users={users}
                />
              ))}
            </div>
          ),
        },
        {
          key: '2',
          label: (
            <span className={classStyle}>
              <LuImage />
              <p>لایک شده ها</p>
            </span>
          ),
          children: <div className="flex flex-wrap gap-2 w-full h-[100vh] font-vazir">
            {likedPost?.length === 0 && <Empty text='پستی لایک نشده' />}
          {likedPost.map((post) => (
            <BoxPost
              key={post.id}
              post={post}
              currentUser={currentUser!}
              users={users}
            />
          ))}
        </div>,
        }
      ];
    
  return (
      <Tabs
        defaultActiveKey="1"
        items={items}
      />
  )
}

export default TabBar;
