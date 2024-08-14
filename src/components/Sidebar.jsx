import React, { useState } from 'react'
import { IoIosAddCircle, IoMdNotificationsOutline } from 'react-icons/io'
import { IoChevronDown, } from 'react-icons/io5'
import { LuActivity, LuBadgeX, LuCheck, LuCheckCircle, LuCog, LuCrown, LuFlag, LuFlagTriangleRight, LuHash, LuInfo, LuLogOut, LuMoreHorizontal, LuPen, LuPencilLine, LuSearch, LuSettings, LuStar, LuTimerReset, LuTrash2, LuTrophy, LuUser2, LuWorkflow, LuX } from 'react-icons/lu'
import { BsLayoutSidebar } from 'react-icons/bs'
import { Link, useLocation } from 'react-router-dom'
import { RiLoader5Fill } from 'react-icons/ri'

function Sidebar({ username }) {
    const [profileMenu, setProfileMenu] = useState(false)
    const [logoutAnimate, setLogoutAnimate] = useState(false)
    const location = useLocation()

    const showPMenu = () => {
        setProfileMenu(true)
    }

    const handleLogout = () => {
        localStorage.removeItem('upfront_user')
        localStorage.removeItem('upfront_user_name')
        setLogoutAnimate(true)
        setTimeout(() => {
            window.location.reload()
        }, 1000);
    }

    const linkStyle = 'min-h-[34px] w-full flex items-center gap-2 px-2 py-[7px] font-normal text-text-color/90 tracking-tight rounded-md line-clamp-1 relative'

    return (
        <div className='w-[256px] min-w-[256px] sticky top-0'>
            <div className=' relative w-full h-full'>
                {/* overlay */}
                <div onClick={() => setProfileMenu(false)} className={` top-0 left-0 w-full h-full z-20 bg-transparent ${profileMenu ? 'fixed' : 'hidden'}`}></div>
                {/* dropdown */}
                {profileMenu && (
                    <div className='w-[290px] h-fit max-h-[80vh] bg-white z-30 absolute top-[52px] left-3 rounded-xl shadow-custom ring-1 ring-border-line-color/0'>
                        <div className='p-2'>
                            <Link to={'/'} className='min-h-[34px] flex items-center gap-2 px-2 py-[3px] text-sm font-normal tracking-tight rounded-md hover:bg-stone-200/50 line-clamp-1 '>
                                <LuTrophy className='text-xl text-text-color/50 min-w-fit' />
                                <div className='w-full h-fit flex-col'>
                                    <p className='line-clamp-1 text-sm font-medium text-text-color'>{username}</p>
                                    <p className='line-clamp-1 text-text-color/70 text-xs'>242 Completed </p>
                                </div>
                            </Link>
                        </div>
                        <div className='w-full h-[1px] bg-border-line-color/70'></div>
                        <div className='p-2 flex flex-col'>
                            <Link to={'/'} className='min-h-[34px] flex items-center gap-2 px-2 py-[7px] font-normal text-text-color text-sm tracking-tight rounded-md hover:bg-stone-200/50 line-clamp-1 '>
                                <LuSettings className='text-xl text-text-color/50  min-w-fit' />
                                <p className='line-clamp-1'>Settings</p>
                            </Link>
                            <Link to={'/'} className='min-h-[34px] flex items-center gap-2 px-2 py-[7px] font-normal text-text-color text-sm tracking-tight rounded-md hover:bg-stone-200/50 line-clamp-1 '>
                                <LuActivity className='text-xl text-text-color/50  min-w-fit' />
                                <p className='line-clamp-1'>Activity log</p>
                            </Link>
                            <Link to={'/'} className='min-h-[34px] flex items-center gap-2 px-2 py-[7px] font-normal text-text-color text-sm tracking-tight rounded-md hover:bg-stone-200/50 line-clamp-1 '>
                                <LuInfo className='text-xl text-text-color/50  min-w-fit' />
                                <p className='line-clamp-1'>About Upfront.</p>
                            </Link>
                        </div>
                        <div className='w-full h-[1px] bg-border-line-color/70'></div>
                        <div className='p-2 flex flex-col'>
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
                        <div className='p-2 flex items-center justify-start gap-2'>
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
                )}
                <div className='w-full h-fit min-h-svh max-h-svh border-r-[1px] border-border-line-color/20 bg-sidebar-color flex flex-col gap-[2px] p-3 text-sm overflow-y-auto'>
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
                    <Link to={'/'} className={`${linkStyle} hover:bg-stone-200/50 group-hover:bg-stone-200/50`}>
                        <LuSearch className='text-xl  min-w-fit' />
                        <p className='line-clamp-1'>Search</p>
                    </Link>
                    <Link to={'/'} className={`${linkStyle} hover:bg-stone-200/50 group-hover:bg-stone-200/50`}>
                        <LuTimerReset className='text-xl  min-w-fit' />
                        <p className='line-clamp-1'>Dues</p>
                    </Link>
                    <Link to={'/'} className={`${linkStyle} hover:bg-stone-200/50 group-hover:bg-stone-200/50`}>
                        <LuStar className='text-xl  min-w-fit' />
                        <p className='line-clamp-1'>Stared Projects</p>
                    </Link>
                    <Link to={'/'} className={`${linkStyle} hover:bg-stone-200/50 group-hover:bg-stone-200/50`}>
                        <LuCheckCircle className='text-lg px-[1px] min-w-fit' />
                        <p className='line-clamp-1'>Completed </p>
                    </Link>
                    <p className='flex items-center gap-2 pt-[13px] pb-[7px] px-[10px] font-medium text-text-color/70 tracking-tight'>Workspaces</p>
                    <div className='relative group '>
                        <Link to={'/'} className={`${linkStyle} ${location.pathname === '/' ? 'bg-main-color/5 ' : 'hover:bg-stone-200/50 group-hover:bg-stone-200/50'}`}>
                            <LuHash className='text-xl text-lime-600  min-w-fit' />
                            <p className='line-clamp-1'>Workspace 1</p>
                            {/* <form className='w-[75%] h-[60%] absolute left-2'>
                                <input type="text" className=" h-full w-full bg-white ring-2 ring-main-color rounded-sm px-1" />
                            </form> */}
                        </Link>
                        <button className={`absolute right-3 bottom-0 top-0 my-auto h-fit w-fit flex items-center justify-center rounded-full ${location.pathname === '/' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                            <LuMoreHorizontal className='text-xl text-text-color/70 hover:text-text-color' />
                        </button>
                        {/* <div className='absolute right-0 top-[100%] bg-white rounded-xl w-fit max-w-[170px] h-fit shadow-md z-20 ring-1 ring-border-line-color/50 p-2'>
                            <Link to={'/'} className={`${linkStyle} ${location.pathname === '/workspace/2' ? 'bg-main-color/5 ' : 'hover:bg-stone-200/50'}`}>
                                <LuPencilLine className='text-lg  min-w-fit' />
                                <p className='line-clamp-1'>Rename</p>
                            </Link>
                            <Link to={'/'} className={`${linkStyle} ${location.pathname === '/workspace/2' ? 'bg-main-color/5 ' : 'hover:bg-stone-200/50'}`}>
                                <LuTrash2 className='text-lg  min-w-fit text-red-500' />
                                <p className='line-clamp-1 text-red-500'>Clear</p>
                            </Link>
                        </div>
                        <div className='absolute right-0 top-[100%] bg-white rounded-xl w-fit max-w-[170px] h-fit shadow-md z-20 ring-1 ring-border-line-color/50 p-2'>
                            <Link to={'/'} className={`${linkStyle} ${location.pathname === '/workspace/2' ? 'bg-main-color/5 ' : 'hover:bg-stone-200/50'}`}>
                                <LuCheck className='text-lg  min-w-fit' />
                                <p className='line-clamp-1'>Save Changes</p>
                            </Link>
                            <Link to={'/'} className={`${linkStyle} ${location.pathname === '/workspace/2' ? 'bg-main-color/5 ' : 'hover:bg-stone-200/50'}`}>
                                <LuX className='text-lg  min-w-fit text-red-500' />
                                <p className='line-clamp-1 text-red-500'>Cancel</p>
                            </Link>
                        </div> */}
                    </div>
                    <div className='relative group '>
                        <Link to={'/'} className={`${linkStyle} ${location.pathname === '/workspace/2' ? 'bg-main-color/5 ' : 'hover:bg-stone-200/50 group-hover:bg-stone-200/50'}`}>
                            <LuHash className='text-xl text-orange-600  min-w-fit' />
                            <p className='line-clamp-1'>Workspace 2</p>
                        </Link>
                        <button className={`absolute right-3 bottom-0 top-0 my-auto h-fit w-fit flex items-center justify-center rounded-full ${location.pathname === '/workspace/2' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                            <LuMoreHorizontal className='text-xl text-text-color/70 hover:text-text-color' />
                        </button>
                    </div>
                    <div className='relative group '>
                        <Link to={'/work'} className={`${linkStyle} ${location.pathname === '/workspace/3' ? 'bg-main-color/5 ' : 'hover:bg-stone-200/50 group-hover:bg-stone-200/50'}`}>
                            <LuHash className='text-xl text-cyan-600  min-w-fit' />
                            <p className='line-clamp-1'>Workspace 3</p>
                        </Link>
                        <button className={`absolute right-3 bottom-0 top-0 my-auto h-fit w-fit flex items-center justify-center rounded-full ${location.pathname === '/workspace/3' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                            <LuMoreHorizontal className='text-xl text-text-color/70 hover:text-text-color' />
                        </button>
                    </div>
                    <Link to={'/'} className={`${linkStyle} hover:bg-stone-200/50 group-hover:bg-stone-200/50`}><LuCrown className='text-xl text-yellow-600' /> More Workspaces</Link>
                    <p className='flex items-center gap-2 pt-[13px] pb-[7px] px-[10px] font-medium text-text-color/70 tracking-tight'>Collaborations</p>
                    <Link to={'/'} className='min-h-[34px] flex items-center gap-2 px-2 py-[7px] font-normal text-text-color/90 tracking-tight rounded-md hover:bg-stone-200/50 line-clamp-1 '>
                        <LuWorkflow className='text-xl text-main-color min-w-fit' />
                        <p className='line-clamp-1'>Gearyo Application </p>
                    </Link>
                    <Link to={'/'} className='min-h-[34px] flex items-center gap-2 px-2 py-[7px] font-normal text-text-color/90 tracking-tight rounded-md hover:bg-stone-200/50 line-clamp-1 '>
                        <LuWorkflow className='text-xl text-main-color min-w-fit' />
                        <p className='line-clamp-1'>Project Bika </p>
                    </Link>


                </div>
            </div>

        </div>
    )
}

export default Sidebar