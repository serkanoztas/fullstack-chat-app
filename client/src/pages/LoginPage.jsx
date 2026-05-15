import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {

  const [currState, setCurrState] = useState("Signup");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [bio, setBio] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (currState === "Signup" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }

    login(currState === "Signup" ? "signup" : "login", { fullName, email, password, bio });
  }

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center sm:justify-evenly gap-12 md:gap-0 max-sm:flex-col backdrop-blur-2xl text-white'>
      <div>
        <img src={assets.logo_big} className='max-w-[200px] w-full' />
      </div>
      <div>
        <form onSubmit={onSubmitHandler} className='flex flex-col gap-6 border-1 border-gray-500 rounded-lg p-8' action="">
          <div className='flex flex-row items-center justify-between'>
            <h1 className='text-2xl text-white font-semibold'> {currState} </h1>
            <img onClick={() => setIsDataSubmitted(false)} src={assets.arrow_icon} className='w-7 cursor-pointer' />
          </div>
          {
            currState === "Signup" && !isDataSubmitted && (
              <input onChange={(e) => setFullName(e.target.value)} className='border-1 border-gray-400 rounded-lg px-4 py-2  max-w-[300px] w-full' type="text" placeholder='Full Name' />
            )
          }
          {
            !isDataSubmitted && (
              <>
                <input onChange={(e) => setEmail(e.target.value)} className='border-1 border-gray-400 rounded-lg px-4 py-2  max-w-[300px] w-full' type="email" placeholder='Email Address' />
                <input onChange={(e) => setPassword(e.target.value)} className='border-1 border-gray-400 rounded-lg px-4 py-2  max-w-[300px] w-full' type="password" placeholder='Password' />
              </>
            )
          }
          {
            currState === "Signup" && isDataSubmitted && (
              <>
                <textarea onChange={(e) => setBio(e.target.value)} value={bio} rows={4} required placeholder='provide a short bio'></textarea>
              </>
            )
          }

          <button type='submit' onClick={() => setIsDataSubmitted(true)} className='text-white text-sm rounded-lg px-4 py-2 max-w-[300px] w-full bg-violet-500 mx-auto cursor-pointer'>
            {currState === "Signup" ? "Create Account" : "Login Now"}
          </button>

          <div className='flex flex-row gap-2'>
            <input type="checkbox" />
            <p className='text-xs text-gray-400'>Agree to the terms of use & privacy policy.</p>
          </div>
          <div className='flex flex-row gap-1 items-center'>
            {
              currState === "Signup" ?
                (<>
                  <p className='text-xs text-gray-400'>Already have an account?</p>
                  <span onClick={() => { setCurrState("Login"); setIsDataSubmitted(false) }} className='text-sm text-violet-400 cursor-pointer'>Login here</span>
                </>)
                : (
                  <>
                    <p className='text-xs text-gray-400'>Create an account</p>
                    <span onClick={() => setCurrState("Signup")} className='text-sm text-violet-400 cursor-pointer'>Click Here</span>
                  </>
                )
            }
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage