import React, { useContext, useEffect, useState } from 'react'
import assets, { imagesDummyData } from "../assets/assets"
import { useNavigate } from "react-router-dom"
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';

const RightSideBar = () => {

    const { selectedUser, messages } = useContext(ChatContext);
    const { logout, onlineUsers } = useContext(AuthContext);
    const [messageImages, setMessageImages] = useState([]);

    useEffect(() => {
        if (messages.length > 0) {
            const images = messages.filter(msg => msg.image).map(msg => msg.image);
            setMessageImages(images);
        }
    }, [messages]);

    return (
        <div className='flex flex-col h-full rounded-l-2xl'>
            <div className='flex flex-col items-center my-6 gap-3'>
                <img src={selectedUser.profilePic || assets.profile_martin} className='w-30 rounded-full' />
                <div className='flex items-center gap-2'>
                    {onlineUsers.includes(selectedUser._id) ? (
                        <p className='w-3 h-3  rounded-full bg-green-500'></p>
                    ) : <p className='w-3 h-3 rounded-full bg-gray-500'></p>}
                    <h1 className='font-semibold text-xl'> {selectedUser.fullName} </h1>
                </div>
                <p className='text-xs'> {selectedUser.bio} </p>
            </div>
            <hr className="border-gray-500 max-w-[200px] w-full"  />
            <div className='flex-1 overflow-y-auto p-2 flex flex-col items-center'>
                <p className='text-gray-200 text-xs'>Media</p>
                <div className='grid grid-cols-3 gap-4 p-2'>
                    {messageImages.map((url, index) => (

                        <div key={index} onClick={() => window.open(url)} className='cursor-pointer'>
                            <img className='opacity-50' src={url} />
                        </div>

                    ))}
                </div>
            </div>
            <button onClick={logout} className='rounded-2xl mx-auto text-white bg-violet-500 px-2 py-2 my-2 max-w-[200px] w-full text-xs'>Logout</button>
        </div>
    )
}

export default RightSideBar