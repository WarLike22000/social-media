import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const { caption, photos, location, tags} = body;

        if(!currentUser) {
            return new NextResponse("Unauthenticated", { status: 400 })
        }

        const post = await prisma.post.create({
            data: {
                caption,
                photo: photos,
                location,
                tags,
                userId: currentUser.id
            }
        })

        return NextResponse.json(post)
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 })
    }
}