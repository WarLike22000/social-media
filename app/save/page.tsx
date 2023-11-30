import React from 'react'
import CardPost from '../(home)/components/CardPost'
import getCurrentUser from '../actions/getCurrentUser'
import getAllUser from '../actions/getAllUser';
import prisma from "@/app/libs/prismadb";
import Empty from '../components/Empty';

const SavePage = async () => {

    const currentUser = await getCurrentUser();
    const users = await getAllUser();
    
    
    const posts = await prisma.post.findMany({
        where: {
            id: {
                in: [...currentUser?.saves!]
            }
        },
        include: {
            user: true
        }
    })
    
    if(posts.length === 0) {
      return <Empty text='چیزی ذخیره نشده' />
    }
    
  return (
    <div className="bg-dark w-full overflow-y-auto max-md:mb-16">
      {posts.map((post) => (
        <CardPost
          key={post.id}
          post={post}
          currentUser={currentUser}
          users={users}
        />
      ))}
    </div>
  )
}

export default SavePage
