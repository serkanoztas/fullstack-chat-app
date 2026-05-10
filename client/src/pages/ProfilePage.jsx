import React, { useState } from 'react'
import assets from '../assets/assets'
import { useNavigate } from "react-router-dom"

const ProfilePage = () => {

  const [selectedImg, setSelectedImg] = useState();
  const [bio, setBio] = useState("");
  const [name, setName] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/");
  }

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center sm:justify-evenly gap-12 md:gap-0 max-sm:flex-col backdrop-blur-2xl text-white'>
      <div className='border-1 border-gray-500 rounded-2xl flex items-center justify-between p-8 max-sm:flex-col-reverse'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6  rounded-lg p-8'>
          <h1 className='text-2xl '>Profile Details</h1>
          <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
            <input onChange={(e) => setSelectedImg(e.target.files[0])} type="file" id='avatar' className='hidden' />
            <img src={`${selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon}`} className={`w-12 h-12 ${selectedImg && "rounded-full"}`} />
            upload profile image
          </label>
          <input onChange={(e) => setName(e.target.value)} value={name} className='border-1 border-gray-400 rounded-lg px-4 py-2  max-w-[300px] w-full' placeholder='Full Name' type="text" />
          <textarea onChange={(e) => setBio(e.target.value)} value={bio} className='border-1  border-gray-500 p-2 rounded-xl' rows={4} required placeholder='provide a short bio'></textarea>
          <button onClick={handleSubmit} className='text-white text-sm rounded-lg px-4 py-2 max-w-[300px] w-full bg-violet-500 mx-auto cursor-pointer'>Save</button>
        </form>
        <div>
          <img src={assets.logo_icon} className='w-40' />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage