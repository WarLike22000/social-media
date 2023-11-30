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
            const updatePostSave = await prisma.user.update({
                where: {
                    id: currentUser?.id
                },
                data: {
                    saves: {
                        push: params.postId
                    }
                }
            })

            return NextResponse.json(updatePostSave);
        } else if(status === "remove") {
            const updatePostSave = await prisma.user.update({
                where: {
                    id: currentUser?.id
                },
                data: {
                    saves: {
                        set: currentUser?.saves.filter((id) => id !== params.postId)
                    }
                }
            })
            return NextResponse.json(updatePostSave);
        }
        

    } catch (error) {
        console.log("ERROR_PATCH_SAVE")
        return new NextResponse("Internal error", { status: 500 })
    }
}