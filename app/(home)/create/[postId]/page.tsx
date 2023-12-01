import React from 'react'
import PostForm from './components/PostForm'
import prisma from "@/app/libs/prismadb";

const UpdatePage = async ({
    params
} : {
    params: { postId: string }
}) => {

    let post;
    
    if(params.postId.length === 24) {
        post = await prisma.post.findUnique({
            where: {
                id: params?.postId
            }
        })
    }
    
  return (
    <div className="w-full bg-dark h-[100vh] overflow-y-auto">
        <PostForm post={post} />
    </div>
  )
}

export default UpdatePage
