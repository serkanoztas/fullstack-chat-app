import React from 'react'
import assets, { imagesDummyData, userDummyData } from "../assets/assets"
import { useNavigate } from "react-router-dom"

const RightSideBar = ({ selectedUser, setSelectedUser }) => {
    return (
        <div className='flex flex-col items-center rounded-l-2xl '>
            <div className='flex flex-col items-center my-6 gap-3'>
                <img src={selectedUser.profilePic || assets.profile_martin} className='w-30 rounded-full' />
                <h1 className='font-semibold text-xl'> {selectedUser.fullName} </h1>
                <p className='text-xs'> {selectedUser.bio} </p>
            </div>
            <hr className="border-gray-500 max-w-[200px] w-full" />
            <div className='p-2 flex flex-col items-center'>
                <p className='text-gray-200 text-xs'>Media</p>
                <div className='grid grid-cols-2 gap-4 p-2'>
                    {imagesDummyData.map((url, index) => (

                        <div key={index} onClick={() => window.open(url)} className='cursor-pointer'>
                            <img className='opacity-50' src={url} />
                        </div>

                    ))}
                </div>
            </div>
            <button className='rounded-2xl text-white bg-violet-500 px-2 py-2 max-w-[200px] w-full text-xs'>Logout</button>
        </div>
    )
}

export default RightSideBar