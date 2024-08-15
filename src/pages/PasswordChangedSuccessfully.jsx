import React, { useEffect } from 'react'
import { GoShieldCheck } from 'react-icons/go'
import { IoShieldCheckmarkOutline } from 'react-icons/io5'
import { MdArrowOutward } from 'react-icons/md'
import { Link } from 'react-router-dom'

function PasswordChangedSuccessfully() {
    localStorage.removeItem('fpq-key-code-random')
    useEffect(() => {
        document.title = "Successfully Updated Password - Upfront";
      }, [])
    return (
        <div className='w-full h-full min-h-svh flex flex-col items-center justify-center'>
            <GoShieldCheck className='text-main-color text-[60px]' />
            <h1 className='text-xl font-semibold mt-2'>Your Password has been Updated</h1>
            <div className='flex items-center justify-center w-full py-1 gap-1 max-sm:flex-col text-text-color/70 text-sm'>
                <h1>Now try to </h1>
                <Link to="/auth/login" className='text-main-color font-medium w-fit flex items-center gap-1 '>Login <MdArrowOutward /></Link>
            </div>
        </div>
    )
}

export default PasswordChangedSuccessfully