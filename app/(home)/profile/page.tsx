import React from 'react'
import Profile from './components/Profile';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getAllUser from '@/app/actions/getAllUser';
import prisma from "@/app/libs/prismadb";

const ProfilePage = async () => {

  const currentUser = await getCurrentUser();
  const users = await getAllUser();
  
  const likedPost = await prisma.post.findMany({
    where: {
        id: {
            in: currentUser?.likedPost
        },
        user: {
          id: currentUser?.id
        }
    },
    include: {
        user: true
    }
})
  
  return (
    <div className="w-full h-[100vh] overflow-y-auto mb-6">
      <Profile currentUser={currentUser} users={users} likedPost={likedPost} />
    </div>
  )
}

export default ProfilePage;
