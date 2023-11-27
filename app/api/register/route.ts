import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    try {
        const { username, email, password } = await request.json();
        if(!username || !email || !password) {
            return new NextResponse("Missing info", { status: 400 })
        };

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                name: username,
                email,
                hashedPassword
            }
        })

        return NextResponse.json(user);
        
    } catch (error) {
        return new NextResponse("Internal error", { status: 500 })
    }
}