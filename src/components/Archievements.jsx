import React, { useState } from 'react'
import { LuActivity, LuArchive, LuAtSign, LuInfo, LuLogOut, LuSettings, LuTrash2, LuTrophy, LuX } from 'react-icons/lu'
import { RiLoader5Fill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
function Achievements({ username, handleClose }) {
    const [logoutAnimate, setLogoutAnimate] = useState(false)
    const handleLogout = () => {
        localStorage.removeItem('upfront_user')
        localStorage.removeItem('upfront_user_name')
        localStorage.removeItem('upfront_user_name_w1')
        localStorage.removeItem('mycollaborations')
        setLogoutAnimate(true)
        setTimeout(() => {
            window.location.reload()
        }, 1000);
    }
    return (
        <div className='w-[480px] h-[480px] max-h-[480px] overflow-hidden flex flex-col justify-start items-start'>
            <div className='p-2 w-full'>
                <div className='min-h-[34px] w-full flex items-center justify-between gap-2 px-2 py-[3px] text-sm font-normal tracking-tight line-clamp-1 '>
                    <p className='line-clamp-1 text-base font-bold text-text-color'>Achievements</p>
                    <button onClick={handleClose} title='close' className='hover:bg-stone-100 p-1 rounded-lg transition active:scale-90'>
                        <LuX className='text-text-color text-xl' />
                    </button>
                </div>
            </div>
            <div className='p-2 flex flex-col w-full h-full overflow-y-auto text-text-color border-t-[1px] border-border-line-color/70'>
                {/* <Link to={'/'} className='min-h-[34px] flex items-center gap-2 px-2 py-[7px] font-normal text-text-color text-sm tracking-tight rounded-md hover:bg-stone-200/50 line-clamp-1 '>
                    <LuTrash2 className='text-xl text-text-color/50  min-w-fit' />
                    <p className='line-clamp-1'>Trash</p>
                </Link> */}
                </div>

        </div>
    )
}
export default Achievements