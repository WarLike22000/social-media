"use client";

import { TailSpin } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-[100vh]">
      <TailSpin
        height="80"
        width="80"
        color="#5727A3"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  )
}

export default Loading
