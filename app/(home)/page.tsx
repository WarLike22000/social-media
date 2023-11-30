import getAllUser from "../actions/getAllUser";
import getCurrentUser from "../actions/getCurrentUser";
import Empty from "../components/Empty";
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
  
  if(posts.length === 0) {
    return <Empty text="پستی وجود ندارد" />
  }
  
  return (
    <div className="bg-dark w-full overflow-y-auto max-md:mb-16">
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
