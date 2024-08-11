import React from 'react'
import logo from '../assets/logo-60x60.png'
import { FcGoogle } from 'react-icons/fc'

function Login() {
  return (
    <div className='w-full h-fit min-h-svh flex flex-col text-sm text-text-color'>
      {/* topbar */}
      <div className='w-full py-3 px-10 '>
        <div className='flex items-center gap-1'>
          <div className='min-w-8'>
            <img src={logo} className="h-8" loading='lazy' />
          </div>
          <h1 className='font-semibold text-xl font-l text-main-color tracking-tight'>Upfront.</h1>
        </div>
      </div>
      {/* form */}
      <div className="w-full max-w-[400px] p-5 mx-auto h-full flex-1 flex flex-col items-start justify-center gap-2">
        <div className='w-full'>
          <h1 className='text-2xl font-semibold'>Login</h1>
          <p className='font-medium text-text-color/70 pb-4 text-xs'>Hi, Welcome back!</p>
          <button title='Login with Google' className='w-full h-[40px] ring-1 ring-border-line-color rounded-md font-semibold flex items-center justify-center gap-1 transition hover:opacity-80'>
            Login with Google
            <FcGoogle className='text-xl' />
          </button>
        </div>
        <h1 className='relative w-full py-4'>
          <hr className='border-border-line-color z-10' />
          <span className='absolute top-0 left-0 bottom-0 right-0 m-auto w-fit h-fit bg-white text-xs px-3 font-medium text-text-color/70 '>or login with Email</span>
        </h1>
        <form className="flex flex-col items-start justify-start gap-2 w-full h-fit ">
          <label className='w-full'>
            <h1 className='mb-2'>Email</h1>
            <input type="text" placeholder='E.g. johndoe@gmail.com' className="w-full h-[40px] ring-1 ring-border-line-color p-3 focus:ring-2 focus:ring-main-color rounded-md placeholder:text-text-color/50 " id="" />
          </label>
        </form>
      </div>
    </div>
  )
}

export default Login