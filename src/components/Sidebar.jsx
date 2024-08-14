import React, { useState } from 'react'
import { IoIosAddCircle, IoMdNotificationsOutline } from 'react-icons/io'
import { IoChevronDown, } from 'react-icons/io5'
import { LuCheckCircle, LuCrown, LuHash, LuSearch, LuStar, LuTimerReset, LuWorkflow } from 'react-icons/lu'
import { BsLayoutSidebar } from 'react-icons/bs'
import { Link } from 'react-router-dom'

function Sidebar({ username }) {
    const [profileMenu, setProfileMenu] = useState(false)

    const showPMenu = () => {
        setProfileMenu(true)
    }
    return (
        <div className='w-[256px] min-w-[256px] sticky top-0'>
            <div className=' relative w-full h-full'>
                {/* overlay */}
                <div onClick={() => setProfileMenu(false)} className={` top-0 left-0 w-full h-full z-20 bg-transparent ${profileMenu ? 'fixed' : 'hidden'}`}></div>
                {/* dropdown */}
                {profileMenu && (
                    <div className='w-[290px] h-[400px] max-h-[80vh] bg-white z-30 absolute top-[52px] left-3 rounded-xl shadow-custom ring-1 ring-border-line-color/0'>
                        <div className='p-2'>
                            <Link to={'/'} className='min-h-[34px] flex items-center gap-2 px-2 py-[7px] text-sm font-medium text-text-color/90 tracking-tight rounded-md hover:bg-stone-200/50 line-clamp-1 '>
                                <LuSearch className='text-xl  min-w-fit' />
                                <div className='w-full h-fit flex-col'>
                                <p className='line-clamp-1'>Search</p>
                                <p className='line-clamp-1'>Search</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                )}
                <div className='w-full h-fit min-h-svh max-h-svh border-r-[1px] border-border-line-color/20 bg-sidebar-color flex flex-col p-3 text-sm overflow-y-auto'>
                    <div className='w-full flex items-center justify-between mb-4'>
                        <button onClick={showPMenu} className=' max-w-[105px] flex items-center justify-start gap-[2px] hover:bg-stone-200/50 transition p-1 rounded-lg'>
                            <p className='h-[26px] w-auto aspect-square rounded-full bg-main-color hover:bg-main-color-hover transition flex items-center justify-center text-base font-semibold text-white'>{username.charAt(0)}</p>
                            <p className='truncate font-medium pl-[6px]'>{username}</p>
                            <IoChevronDown className='min-w-[15px] text-text-color/70' />
                        </button>
                        <div className='flex items-center justify-end gap-0'>

                            <button title='Notifications' className=' h-[33px] text-text-color/70 w-auto aspect-square flex items-center justify-center rounded-full transition hover:bg-stone-200/50 hover:text-text-color'>
                                <IoMdNotificationsOutline className='text-[22px]' />
                            </button>
                            <button title='Toggle Sidebar' className=' h-[33px] text-text-color/70 w-auto aspect-square flex items-center justify-center rounded-full transition hover:bg-stone-200/50 hover:text-text-color '>
                                <BsLayoutSidebar className='text-[18px]' />
                            </button>

                        </div>
                    </div>
                    <Link to={'/'} className='min-h-[34px] flex items-center gap-2 px-[5px] py-[5px] font-medium text-main-color tracking-tight rounded-md hover:bg-stone-200/50'><IoIosAddCircle className='text-2xl' /> Create Project</Link>
                    <Link to={'/'} className='min-h-[34px] flex items-center gap-2 px-2 py-[7px] font-medium text-text-color/90 tracking-tight rounded-md hover:bg-stone-200/50 line-clamp-1 '>
                        <LuSearch className='text-xl  min-w-fit' />
                        <p className='line-clamp-1'>Search</p>
                    </Link>
                    <Link to={'/'} className='min-h-[34px] flex items-center gap-2 px-2 py-[7px] font-medium text-text-color/90 tracking-tight rounded-md hover:bg-stone-200/50 line-clamp-1 '>
                        <LuTimerReset className='text-xl  min-w-fit' />
                        <p className='line-clamp-1'>Dues</p>
                    </Link>
                    <Link to={'/'} className='min-h-[34px] flex items-center gap-2 px-2 py-[7px] font-medium text-text-color/90 tracking-tight rounded-md hover:bg-stone-200/50 line-clamp-1 '>
                        <LuStar className='text-xl  min-w-fit' />
                        <p className='line-clamp-1'>Stared Projects</p>
                    </Link>
                    <Link to={'/'} className='min-h-[34px] flex items-center gap-2 px-2 py-[7px] font-medium text-text-color/90 tracking-tight rounded-md hover:bg-stone-200/50 line-clamp-1 '>
                        <LuCheckCircle className='text-lg px-[1px] min-w-fit' />
                        <p className='line-clamp-1'>Completed </p>
                    </Link>
                    <p className='flex items-center gap-2 pt-[13px] pb-[7px] px-[10px] font-medium text-text-color/70 tracking-tight'>Workspaces</p>
                    <Link to={'/'} className='min-h-[34px] flex items-center gap-2 px-2 py-[7px] font-medium text-text-color/90 tracking-tight rounded-md hover:bg-stone-200/50 line-clamp-1 '>
                        <LuHash className='text-xl text-lime-600  min-w-fit' />
                        <p className='line-clamp-1'>Workspace 1</p>
                    </Link>
                    <Link to={'/'} className='min-h-[34px] flex items-center gap-2 px-2 py-[7px] font-medium text-text-color/90 tracking-tight rounded-md hover:bg-stone-200/50 line-clamp-1 '>
                        <LuHash className='text-xl text-orange-600  min-w-fit' />
                        <p className='line-clamp-1'>Workspace 2</p>
                    </Link>
                    <Link to={'/'} className='min-h-[34px] flex items-center gap-2 px-2 py-[7px] font-medium text-text-color/90 tracking-tight rounded-md hover:bg-stone-200/50 line-clamp-1 '>
                        <LuHash className='text-xl text-cyan-600  min-w-fit' />
                        <p className='line-clamp-1'>Workspace 3</p>
                    </Link>
                    <Link to={'/'} className='min-h-[34px] flex items-center gap-2 px-2 py-[7px] font-medium text-text-color/90 tracking-tight rounded-md hover:bg-stone-200/50'><LuCrown className='text-xl text-yellow-600' /> More Workspaces</Link>
                    <p className='flex items-center gap-2 pt-[13px] pb-[7px] px-[10px] font-medium text-text-color/70 tracking-tight'>Collaborations</p>
                    <Link to={'/'} className='min-h-[34px] flex items-center gap-2 px-2 py-[7px] font-medium text-text-color/90 tracking-tight rounded-md hover:bg-stone-200/50 line-clamp-1 '>
                        <LuWorkflow className='text-xl text-main-color min-w-fit' />
                        <p className='line-clamp-1'>Gearyo Application </p>
                    </Link>
                    <Link to={'/'} className='min-h-[34px] flex items-center gap-2 px-2 py-[7px] font-medium text-text-color/90 tracking-tight rounded-md hover:bg-stone-200/50 line-clamp-1 '>
                        <LuWorkflow className='text-xl text-main-color min-w-fit' />
                        <p className='line-clamp-1'>Project Bika </p>
                    </Link>


                </div>
            </div>

        </div>
    )
}

export default Sidebar