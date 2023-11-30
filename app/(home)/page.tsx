import getAllUser from "../actions/getAllUser";
import getCurrentUser from "../actions/getCurrentUser";
import CardPost from "./components/CardPost";
import prisma from "@/app/libs/prismadb";

export default async function Home() {

  const currentUser = await getCurrentUser();
  const users = await getAllUser();
  
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc"
    },
    include: {
      user: true
    }
  })
  
  return (
    <div className="bg-dark w-full overflow-y-auto">
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
