import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function PATCH(
    request: Request,
    { params }: { params: { postId: string } }
) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const { caption, photos, location, tags} = body;

        if(!currentUser) {
            return new NextResponse("Unauthenticated", { status: 400 })
        }

        const post = await prisma.post.update({
            where: {
                id: params.postId
            },
            data: {
                caption,
                photo: photos,
                location,
                tags,
            }
        })

        return NextResponse.json(post)
    } catch (error) {
        console.log("ERROR_UPDATE_POST", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { postId: string } }
) {
    try {
        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return new NextResponse("Unauthenticated", { status: 400 })
        };

        const deletePost = await prisma.post.delete({
            where: {
                id: params.postId
            }
        })

        return NextResponse.json(deletePost);
    } catch (error) {
        console.log("ERROR_DELETE_POST", error);
        return new NextResponse("Internal error", { status: 500 })
    }
}