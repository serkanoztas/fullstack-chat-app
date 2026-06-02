import React, { useState, useContext } from 'react'
import SideBar from "../components/SideBar"
import ChatContainer from "../components/ChatContainer"
import RightSideBar from "../components/RightSideBar"
import { ChatContext } from '../context/ChatContext';

const HomePage = () => {

  const { selectedUser } = useContext(ChatContext)

  return (
    <div className='w-full h-screen border sm:px-[15%] sm:py-[5%]'>
      <div className={`backdrop-blur-xl grid grid-cols-1 h-[100%] rounded-2xl overflow-hidden relative border-2 border-gray-600 text-white
        ${selectedUser ? "md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]" : "md:grid-cols-2"}`}>
        <SideBar />
        <ChatContainer />

        {selectedUser && (
          <RightSideBar />
        )}
      </div>

    </div>
  )
}

export default HomePage