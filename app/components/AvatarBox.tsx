"use client"

import React, { useEffect, useState } from 'react'
import { Avatar } from 'antd'
import { User } from '@prisma/client'

interface AvatarBoxProps {
    user?: User | null;
}

const AvatarBox: React.FC<AvatarBoxProps> = ({
    user
}) => {

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true)
    }, []);
  
    if(!mounted) {
      return null
    }
    
  return (
    <div className="flex items-center justify-center gap-3">
      <Avatar
            size="large"
            src={user?.image || "images/placeholder.jpg"}
        />
        <div>
            <h3 className='text-lg'>
                {user?.name}
            </h3>
            <p className="text-sm text-neutral-500">
                {user?.email}
            </p>
        </div>
    </div>
  )
}

export default AvatarBox
