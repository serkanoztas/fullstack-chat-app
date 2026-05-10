import React from 'react'
import assets, { userDummyData } from "../assets/assets"
import { useNavigate } from "react-router-dom"

const SideBar = ({ selectedUser, setSelectedUser }) => {

  const navigate = useNavigate();
  console.log(selectedUser)

  return (
    <div className={`bg-[#8185B2]/10 h-full overflow-y-scroll p-5 text-white ${selectedUser ? "max-md:hidden" : ""}`}>
      <div className='flex flex-row justify-between items-center'>
        <img src={assets.logo} className='max-w-40' />
        <div className='group relative py-2 '>
          <img src={assets.menu_icon} className='max-h-5 cursor-pointer' />
          <div className='hidden group-hover:block absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] text-gray-100 border border-gray-600'>
            <p onClick={() => navigate("/profile")} className='cursor-pointer text-sm'>Edit Profile</p>
            <hr className='bg-gray-500' />
            <p className='cursor-pointer text-sm'>Logout</p>
          </div>
        </div>
      </div>

      <div className='bg-[#282143] flex flex-row items-center rounded-xl px-2 py-1 gap-3 mt-5'>
        <img src={assets.search_icon} className='w-3' />
        <input type="text" placeholder='Search User...' className='border-none outline-none bg-transparent' />
      </div>

      <div className='flex flex-col mt-2'>
        {
          userDummyData.map((user, index) => (
            <div onClick={() => setSelectedUser(user)} key={index} className={`flex flex-row items-center gap-2 p-2 pl-4 relative rounded-xl ${selectedUser?._id === user._id && "bg-[#282142]/50"}`}>
              <img src={user.profilePic} className='w-[35px] aspect-[1/1] rounded-full' />
              <div>
                <p> {user.fullName} </p>
                {
                  index < 3
                    ? <span className='text-green-400 text-sm'>Online</span>
                    : <span className='text-neutral-400 text-sm'>Offline</span>
                }
              </div>
              {
                index > 2 && <p className='rounded-full absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center bg-pink-500/50'> {index} </p>
              }
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default SideBar