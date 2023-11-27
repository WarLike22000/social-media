import Image from 'next/image'
import LoginForm from './components/LoginForm'

const LoginPage = () => {
  return (
    <div className='flex overflow-hidden relative bg-dark'>
      <div>
        <Image
          src="/images/side-img.svg"
          width={600}
          height={600}
          alt='side-img'
          className="hidden xl:flex absolute"
        />
      </div>
      <div className="xl:mr-auto xl:ml-48 max-xl:w-full">
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage
