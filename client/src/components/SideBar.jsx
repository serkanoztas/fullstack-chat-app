import { useContext, useEffect, useState } from 'react'
import assets from "../assets/assets"
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const SideBar = () => {

  const { getUsers, users, selectedUser, setSelectedUser, unseenMessages, setUnseenMessages } = useContext(ChatContext);

  const { logout, onlineUsers, authUser } = useContext(AuthContext);

  const [input, setInput] = useState(false);



  useEffect(() => {
    getUsers();
  }, [onlineUsers])

  const filteredUsers = users
    .filter(user => user._id !== authUser?._id)
    .filter(user =>
      input
        ? user.fullName.toLowerCase().includes(input.toLowerCase())
        : true
    );
  console.log("filteredUsers", filteredUsers);

  const navigate = useNavigate();



  return (
    <div className={`bg-[#8185B2]/10 h-full overflow-y-scroll p-5 text-white ${selectedUser ? "" : ""}`}>
      <div className='flex flex-row justify-between items-center'>
        <img src={assets.logo} className='w-28 sm:w-30 md:w-35 lg:w-40' />
        <div className='group relative py-2 '>
          <img src={assets.menu_icon} className='max-h-5 cursor-pointer w-5' />
          <div className='hidden group-hover:block absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] text-gray-100 border border-gray-600'>
            <p onClick={() => navigate("/profile")} className='cursor-pointer text-sm'>Edit Profile</p>
            <hr className='bg-gray-500' />
            <p onClick={logout} className='cursor-pointer text-sm'>Logout</p>
          </div>
        </div>
      </div>

      <div className='bg-[#282143] flex flex-row items-center rounded-xl px-2 py-1 gap-3 mt-5'>
        <img src={assets.search_icon} className='w-3' />
        <input onChange={(e) => setInput(e.target.value)} type="text" placeholder='Search User...' className='border-none outline-none bg-transparent' />
      </div>

      <div className='flex flex-col mt-2'>
        {
          filteredUsers.map((user, index) => (
            <div onClick={() => {setSelectedUser(user); setUnseenMessages(prev => ({...prev, [user._id]: 0}))}} key={index} className={`flex flex-row items-center gap-2 p-2 pl-4 relative rounded-xl ${selectedUser?._id === user._id && "bg-[#282142]/50"}`}>
              <img src={user.profilePic} className='w-[35px] aspect-[1/1] rounded-full' />
              <div>
                <p> {user.fullName} </p>
                {
                  onlineUsers?.includes(user._id)
                    ? <span className='text-green-400 text-sm'>Online</span>
                    : <span className='text-neutral-400 text-sm'>Offline</span>
                }
              </div>
              {
                unseenMessages?.[user._id] > 0 && <p className='rounded-full absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center bg-pink-500/50'> {unseenMessages?.[user._id]} </p>
              }
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default SideBar