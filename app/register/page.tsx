import React from 'react'
import RegisterForm from './components/RegisterForm'
import Image from 'next/image'

const registerPage = () => {
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
        <RegisterForm />
      </div>
    </div>
  )
}

export default registerPage
