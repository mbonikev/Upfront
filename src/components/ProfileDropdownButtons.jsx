import React, { useState } from 'react'
import { LuActivity, LuArchive, LuInfo, LuLogOut, LuSettings, LuTrash2, LuTrophy } from 'react-icons/lu'
import { RiLoader5Fill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

function ProfileDropdownButtons({ username }) {
    const [logoutAnimate, setLogoutAnimate] = useState(false)


    const handleLogout = () => {
        localStorage.removeItem('upfront_user')
        localStorage.removeItem('upfront_user_name')
        localStorage.removeItem('upfront_user_name_w1')
        localStorage.removeItem('upfront_user_name_w2')
        localStorage.removeItem('upfront_user_name_w3')
        setLogoutAnimate(true)
        setTimeout(() => {
            window.location.reload()
        }, 1000);
    }
    return (
        <div className='w-full flex flex-col justify-start items-start bg-white'>
            <div className='p-2 w-full'>
                <Link to={'/'} className='min-h-[34px] flex items-center gap-2 px-2 py-[3px] text-sm font-normal tracking-tight rounded-md hover:bg-stone-200/50 line-clamp-1 '>
                    <LuTrophy className='text-xl text-text-color/50 min-w-fit' />
                    <div className='w-full h-fit flex-col'>
                        <p className='line-clamp-1 text-sm font-medium text-text-color'>{username}</p>
                        <p className='line-clamp-1 text-text-color/70 text-xs'>242 Completed </p>
                    </div>
                </Link>
            </div>
            <div className='w-full h-[1px] bg-border-line-color/70'></div>
            <div className='p-2 flex flex-col w-full'>
                <Link to={'/'} className='min-h-[34px] flex items-center gap-2 px-2 py-[7px] font-normal text-text-color text-sm tracking-tight rounded-md hover:bg-stone-200/50 line-clamp-1 '>
                    <LuSettings className='text-xl text-text-color/50  min-w-fit' />
                    <p className='line-clamp-1'>Settings</p>
                </Link>
                <Link to={'/'} className='min-h-[34px] flex items-center gap-2 px-2 py-[7px] font-normal text-text-color text-sm tracking-tight rounded-md hover:bg-stone-200/50 line-clamp-1 '>
                    <LuActivity className='text-xl text-text-color/50  min-w-fit' />
                    <p className='line-clamp-1'>Activity log</p>
                </Link>
                <Link to={'/'} className='min-h-[34px] flex items-center gap-2 px-2 py-[7px] font-normal text-text-color text-sm tracking-tight rounded-md hover:bg-stone-200/50 line-clamp-1 '>
                    <LuArchive className='text-xl text-text-color/50  min-w-fit' />
                    <p className='line-clamp-1'>Archived Projects</p>
                </Link>
                <Link to={'/'} className='min-h-[34px] flex items-center gap-2 px-2 py-[7px] font-normal text-text-color text-sm tracking-tight rounded-md hover:bg-stone-200/50 line-clamp-1 '>
                    <LuTrash2 className='text-xl text-text-color/50  min-w-fit' />
                    <p className='line-clamp-1'>Trash</p>
                </Link>
            </div>
            <div className='w-full h-[1px] bg-border-line-color/70'></div>
            <div className='p-2 flex flex-col w-full'>
                <Link to={'/'} className='min-h-[34px] flex items-center gap-2 px-2 py-[7px] font-normal text-text-color text-sm tracking-tight rounded-md hover:bg-stone-200/50 line-clamp-1 '>
                    <LuInfo className='text-xl text-text-color/50  min-w-fit' />
                    <p className='line-clamp-1'>About Upfront</p>
                </Link>
            </div>
            <div className='w-full h-[1px] bg-border-line-color/70'></div>
            <div className='p-2 flex flex-col w-full'>
                <button onClick={handleLogout} className={`min-h-[34px] flex items-center gap-2 px-2 py-[7px] font-normal text-text-color text-sm tracking-tight rounded-md hover:bg-stone-200/50 line-clamp-1 ${logoutAnimate ? 'pointer-events-none' : ''}`}>
                    {logoutAnimate ? <>
                        <RiLoader5Fill className='text-xl animate-spinLoader text-red-500  min-w-fit' />
                        <p className='line-clamp-1'>Logging out..</p>
                    </> : <>
                        <LuLogOut className='text-xl text-red-500  min-w-fit' />
                        <p className='line-clamp-1'>Log out</p>
                    </>}
                </button>
            </div>
            <div className='w-full h-[1px] bg-border-line-color/70'></div>
            <div className='p-2 flex items-center justify-start gap-2 w-full'>
                <Link to={'/'} className='min-h-[28px] w-full flex items-center justify-center gap-2 px-2 py-[6px] font-normal  text-text-color text-sm tracking-tight rounded-md hover:bg-stone-200/50 line-clamp-1 '>
                    {/* <LuLogOut className='text-xl text-text-color/50  min-w-fit' /> */}
                    <p className='line-clamp-1'>What's new? </p>
                </Link>
                <span className='text-sm opacity w-[1px] h-[20px] bg-border-line-color flex'></span>
                <Link to={'/'} className='min-h-[28px] w-full flex items-center justify-center gap-2 px-2 py-[6px] font-normal  text-text-color text-sm tracking-tight rounded-md hover:bg-stone-200/50 line-clamp-1 '>
                    {/* <LuLogOut className='text-xl text-text-color/50  min-w-fit' /> */}
                    <p className='line-clamp-1'>Terms of use </p>
                </Link>
            </div>
        </div>
    )
}

export default ProfileDropdownButtons