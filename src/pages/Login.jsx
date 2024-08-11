import React from 'react'
import logo from '../assets/logo-60x60.png'

function Login() {
  return (
    <div className='w-full h-fit min-h-svh flex flex-col text-sm'>
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
      <form className="w-full max-w-[400px] p-5 mx-auto h-full flex-1 flex flex-col items-start justify-center">
        <div className='w-full'>
          <h1 className='text-2xl font-semibold'>Login</h1>
          <p className='font-medium opacity-70 pb-4'>Hi, Welcome back!</p>
          <button className='w-full h-[45px] ring-1 ring-border-line-color rounded-md font-semibold'>Login with Google</button>
        </div>
        <label>
          <input type="text" name="" id="" />
        </label>
      </form>
    </div>
  )
}

export default Login