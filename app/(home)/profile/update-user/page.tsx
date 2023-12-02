import getCurrentUser from '@/app/actions/getCurrentUser'
import UpdateUserForm from './components/UpdateUserForm'

const UpdateUserPage = async () => {

    const currentUser = await getCurrentUser();
    
  return (
    <div>
        <UpdateUserForm currentUser={currentUser} />
    </div>
  )
}

export default UpdateUserPage
