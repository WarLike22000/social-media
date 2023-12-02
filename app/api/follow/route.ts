import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { userId } = body;

        const currentUser = await getCurrentUser();
        if(!currentUser) {
            return new NextResponse("Unauthenticated", { status: 400 })
        }

        const user = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                following: {
                    push: userId
                }
            }
        })

        return NextResponse.json(user);
    } catch (error) {
        console.log("ERROR_FOLLOW_HANDLER_PATCH", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}