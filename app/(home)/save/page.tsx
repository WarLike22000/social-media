import CardPost from '../../components/CardPost'
import getCurrentUser from '../../actions/getCurrentUser'
import getAllUser from '../../actions/getAllUser';
import prisma from "@/app/libs/prismadb";
import Empty from '../../components/Empty';

export default async function SavePage() {

    const currentUser = await getCurrentUser();
    const users = await getAllUser();
    
    
    const posts = await prisma.post.findMany({
        where: {
            id: {
                in: currentUser?.saves
            },
            user: {
              id: currentUser?.id
            }
        },
        include: {
            user: true
        }
    })
    
    if(posts.length === 0) {
      return <Empty text='پستی ذخیره نشده' />
    }
    
  return (
    <div className="bg-dark w-full overflow-y-auto mb-2">
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