import React from 'react'
import logo from '../assets/logo-60x60.png'

function Login() {
  return (
    <div className='w-full h-fit min-h-svh flex flex-col'>
        <div className='w-full border-b border-container-color py-3'>
            <div className='flex items-center gap-2'>
                <div className='min-w-8'>
                  <img src={logo} className="h-8" loading='lazy' />
                </div>
                <h1 className='font-bold text-xl text-main-color'>Upfront</h1>
            </div>
        </div>
    </div>
  )
}

export default Login