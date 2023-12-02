import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function PATCH(request: Request) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const { name, email, image } = body;

        if(!name || !email || !image) {
            return new NextResponse("Missing info", { status: 401 })
        };

        if(!currentUser) {
            return new NextResponse("Unauthenticated", { status: 400 })
        }

        const user = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                name,
                email,
                image
            }
        })

        return NextResponse.json(user);
    } catch (error) {
        console.log("ERROR_PATCH_UPDATE_USER", error);
        return new NextResponse("Internal error", { status: 500 })
    }
}