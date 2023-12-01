import React from 'react'
import { FaInbox } from "react-icons/fa";

interface EmptyProps {
    text?: string;
}

const Empty: React.FC<EmptyProps> = ({
    text
}) => {
  return (
    <div className="w-full cursor-default flex items-center justify-center flex-col h-[100vh]">
      <FaInbox className="text-neutral-300" size={100} />
      <p className="text-white text-base">
        {text}
      </p>
    </div>
  )
}

export default Empty
