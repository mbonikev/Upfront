import React, { useState } from 'react'
import { LuActivity, LuArchive, LuInfo, LuLogOut, LuSettings, LuTrash2, LuTrophy, LuUsers2, LuWorkflow } from 'react-icons/lu'
import { RiLoader5Fill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

function AddCollaborators({ username, userEmail, collaborations }) {
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
            <div className='pt-2 px-2 w-full'>
                <div className='min-h-[34px] flex items-center gap-2 px-2 py-[3px] text-sm font-normal tracking-tight line-clamp-1 '>
                    <LuUsers2 className='text-xl text-text-color/50 min-w-fit' />
                    <div className='w-full h-fit flex-col'>
                        <p className='line-clamp-1 text-sm font-medium text-text-color'>Add Collaborators</p>
                        <p className='line-clamp-1 text-text-color/70 text-xs'>1 have access</p>
                    </div>
                </div>
            </div>
            <form className='p-2 w-full'>
                <input type='text' placeholder={`user's unique ID`} className='min-h-[34px] w-full flex items-center text-text-color gap-2 px-2 py-[3px] text-sm font-normal tracking-tight rounded-md bg-stone-200/50 line-clamp-1 ' />
                <button type='Submit' className='min-h-[34px] w-full mt-2 flex items-center justify-center gap-1 px-2 py-[7px] font-semibold text-sm tracking-tight rounded-md bg-main-color hover:bg-main-color-hover text-white line-clamp-1 '>
                    {/* <LuSettings className='text-xl min-w-fit' /> */}
                    <p className='line-clamp-1'>Find user</p>
                </button>
            </form>
            <div className='w-full h-[1px] bg-border-line-color/70'></div>
            <div className='p-2 flex flex-col w-full min-h-[140px]'>
                <p className='line-clamp-1 text-sm font-medium text-text-color pt-1 pb-2'>People with access</p>
                {collaborations.map((collab, index) => (
                    <div key={index} className='min-h-[34px] flex items-center justify-between gap-2 px-2 py-1 font-normal text-text-color text-sm tracking-tight rounded-md '>
                        <div className=' flex items-center justify-center gap-2'>
                            <p className="h-[26px] w-auto aspect-square rounded-full bg-main-color/90 transition flex items-center justify-center text-sm font-semibold text-white">
                                {collab.charAt(0)}
                            </p>
                            <p className='line-clamp-1'>{collab} </p>
                        </div>
                        {collab === userEmail ? <span className='bg-stone-100 text-text-color/60 text-xs py-1 px-2 rounded-md'>Owner</span> : ''}
                    </div>
                ))}
            </div>
            <div className='w-full h-[1px] bg-border-line-color/70'></div>
            <div className='p-2 flex flex-col w-full'>
                <Link to={'/'} className='min-h-[34px] flex items-center gap-2 px-2 py-[7px] font-normal text-text-color text-sm tracking-tight rounded-md hover:bg-stone-200/50 line-clamp-1 '>
                    <LuInfo className='text-xl text-text-color/50  min-w-fit' />
                    <p className='line-clamp-1'>How to Locate the Unique ID</p>
                </Link>
            </div>

        </div>
    )
}

export default AddCollaborators