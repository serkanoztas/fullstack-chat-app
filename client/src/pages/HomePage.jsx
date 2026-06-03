import React, { useContext } from 'react'
import SideBar from "../components/SideBar"
import ChatContainer from "../components/ChatContainer"
import RightSideBar from "../components/RightSideBar"
import { ChatContext } from '../context/ChatContext';

const HomePage = () => {

  const { selectedUser } = useContext(ChatContext)

  return (
    <div className='w-full h-screen border sm:px-[10%] sm:py-[5%]'>
      <div
        className={`backdrop-blur-xl grid h-full rounded-2xl overflow-hidden relative border-2 border-gray-600 text-white
        ${selectedUser
            ? "grid-cols-[1fr_1.5fr] lg:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]"
            : "grid-cols-[1fr_1.5fr]"
          }`}
      >
        <SideBar />
        <ChatContainer />

        {selectedUser && (
          <div className="hidden lg:block">
            <RightSideBar />
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage