import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function PATCH(
    request: Request,
    { params }: { params: { postId: string } }
) {
    try {
        const currentUser = await getCurrentUser();
        
        if(!params.postId) {
            return new NextResponse("post id is required", { status: 400 })
        };

        const body = await request.json();
        const { status } = body;
        
        if(status === "add") {
            const updatePostLike = await prisma.user.update({
                where: {
                    id: currentUser?.id
                },
                data: {
                    likedPost: {
                        push: params.postId
                    }
                }
            })

            return NextResponse.json(updatePostLike);
        } else if(status === "remove") {
            const updatePostLike = await prisma.user.update({
                where: {
                    id: currentUser?.id
                },
                data: {
                    likedPost: {
                        set: currentUser?.likedPost.filter((id) => id !== params.postId)
                    }
                }
            })
            return NextResponse.json(updatePostLike);
        }

    } catch (error) {
        console.log("ERROR_PATCH_LIKE")
        return new NextResponse("Internal error", { status: 500 })
    }
}