import prisma from "@/app/libs/prismadb";

const getAllUser = async () => {
    try {
        const users = await prisma.user.findMany()
        
        return users;
    } catch (error) {
        return [];
    }
};

export default getAllUser;