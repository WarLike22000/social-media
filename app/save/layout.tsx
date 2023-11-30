import React from 'react'
import Sidebar from '../components/Sidebar'

const RootLayout = ({
    children
} : {
    children: React.ReactNode
}) => {
  return (
    <Sidebar>
      {children}
    </Sidebar>
  )
}

export default RootLayout
