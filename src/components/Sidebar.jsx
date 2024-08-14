import React, { useEffect, useRef, useState } from 'react'
import { IoIosAddCircle, IoMdNotificationsOutline } from 'react-icons/io'
import { IoChevronDown, } from 'react-icons/io5'
import { LuActivity, LuBadgeX, LuCheck, LuCheckCircle, LuCog, LuCrown, LuFlag, LuFlagTriangleRight, LuHash, LuInfo, LuLogOut, LuMoreHorizontal, LuPen, LuPencilLine, LuSearch, LuSettings, LuStar, LuTimerReset, LuTrash2, LuTrophy, LuUser2, LuWorkflow, LuX } from 'react-icons/lu'
import { BsLayoutSidebar } from 'react-icons/bs'
import { Link, useLocation } from 'react-router-dom'
import { RiLoader5Fill } from 'react-icons/ri'
import axios from 'axios'

function Sidebar({ username, userEmail, w1, setW1, w2, setW2, w3, setW3 }) {
    const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_API;
    const [profileMenu, setProfileMenu] = useState(false)
    const [logoutAnimate, setLogoutAnimate] = useState(false)
    const location = useLocation()
    const [authing, setAuthing] = useState(false)
    const [authing2, setAuthing2] = useState(false)
    const [authing3, setAuthing3] = useState(false)
    const [moreOpt1, setMoreOpt1] = useState(false)
    const [saveOpt1, setSaveOpt1] = useState(false)
    const [moreOpt2, setMoreOpt2] = useState(false)
    const [saveOpt2, setSaveOpt2] = useState(false)
    const [moreOpt3, setMoreOpt3] = useState(false)
    const [saveOpt3, setSaveOpt3] = useState(false)
    const [originalW1, setOriginalW1] = useState(null);
    const [originalW2, setOriginalW2] = useState(null);
    const [originalW3, setOriginalW3] = useState(null);
    const [spaceName, setSpaceName] = useState('');
    const [spaceNumber, setSpaceNumber] = useState('')
    const formRef = useRef(null);

    // workspace1
    const handleSubmit1 = async (e) => {
        e.preventDefault()
        setAuthing(true)
        try {
            const response = await axios.patch(`${apiUrl}/api/updateWorkspace1`, { w1, userEmail });
            // console.log('Response data:', response.data);
            localStorage.setItem('upfront_user_name_w1', response.data.workspace1)
            setOriginalW1(response.data.workspace1)
            setMoreOpt1(false)
            setSaveOpt1(false)
            setAuthing(false)
        } catch (err) {
            console.error('Error updating data:', err);
            setAuthing(false)
        }
    };

    // workspace2
    const handleSubmit2 = async (e) => {
        e.preventDefault()
        setAuthing2(true)
        try {
            const response = await axios.patch(`${apiUrl}/api/updateWorkspace2`, { w2, userEmail });
            // console.log('Response data:', response.data);
            localStorage.setItem('upfront_user_name_w2', response.data.workspace2)
            setOriginalW2(response.data.workspace2)
            setMoreOpt2(false)
            setSaveOpt2(false)
            setAuthing2(false)
        } catch (err) {
            console.error('Error updating data:', err);
            setAuthing2(false)
        }
    };

    // workspace3
    const handleSubmit3 = async (e) => {
        e.preventDefault()
        setAuthing3(true)
        try {
            const response = await axios.patch(`${apiUrl}/api/updateWorkspace1`, { w3, userEmail });
            // console.log('Response data:', response.data);
            localStorage.setItem('upfront_user_name_w3', response.data.workspace3)
            setOriginalW2(response.data.workspace3)
            setMoreOpt3(false)
            setSaveOpt3(false)
            setAuthing3(false)
        } catch (err) {
            console.error('Error updating data:', err);
            setAuthing3(false)
        }
    };

    const showPMenu = () => {
        setProfileMenu(true)
    }

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

    // getting space names
    useEffect(() => {
        const luw1 = localStorage.getItem('upfront_user_name_w1') || 'Workspace 1'
        const luw2 = localStorage.getItem('upfront_user_name_w2') || 'Workspace 2'
        const luw3 = localStorage.getItem('upfront_user_name_w3') || 'Workspace 3'
        setOriginalW1(luw1)
        setOriginalW2(luw2)
        setOriginalW3(luw3)
    }, [])

    const handleCancel = () => {
        setW1(originalW1);
        setMoreOpt1(false)
        setSaveOpt1(false)
    };

    const handleCancel2 = () => {
        setW2(originalW2);
        setMoreOpt2(false)
        setSaveOpt2(false)
    };

    const handleCancel3 = () => {
        setW3(originalW3);
        setMoreOpt3(false)
        setSaveOpt3(false)
    };

    // show more
    const showMoreMenuw1 = () => {
        setMoreOpt1(true)
    }
    // rename workspace 1
    const renameW1 = () => {
        setMoreOpt1(false)
        setSaveOpt1(true)
    }

    // show more
    const showMoreMenuw2 = () => {
        setMoreOpt2(true)
    }
    // rename workspace 1
    const renameW2 = () => {
        setMoreOpt2(false)
        setSaveOpt2(true)
    }

    // show more
    const showMoreMenuw3 = () => {
        setMoreOpt1(true)
    }
    // rename workspace 1
    const renameW3 = () => {
        setMoreOpt1(false)
        setSaveOpt1(true)
    }

    const linkStyle = 'min-h-[34px] w-full flex items-center gap-2 px-2 py-[7px] font-normal text-text-color/90 tracking-tight rounded-md line-clamp-1 relative'

    return (
        <div className='w-[256px] min-w-[256px] sticky top-0'>
            <div className=' relative w-full h-full'>
                {/* overlay */}
                <div onClick={() => setProfileMenu(false)} className={` top-0 left-0 w-full h-full z-20 bg-transparent ${profileMenu ? 'fixed' : 'hidden'}`}></div>
                {/* overlay more menu */}
                <div onClick={handleCancel} className={` top-0 left-0 w-full h-full z-20 bg-transparent ${moreOpt1 ? 'fixed' : 'hidden'}`}></div>
                {/* overlay more menu save */}
                <div onClick={handleCancel} className={` top-0 left-0 w-full h-full z-20 bg-transparent ${saveOpt1 ? 'fixed' : 'hidden'}`}></div>
                {/* overlay more menu */}
                <div onClick={handleCancel2} className={` top-0 left-0 w-full h-full z-20 bg-transparent ${moreOpt2 ? 'fixed' : 'hidden'}`}></div>
                {/* overlay more menu save */}
                <div onClick={handleCancel2} className={` top-0 left-0 w-full h-full z-20 bg-transparent ${saveOpt2 ? 'fixed' : 'hidden'}`}></div>
                {/* overlay more menu */}
                <div onClick={handleCancel3} className={` top-0 left-0 w-full h-full z-20 bg-transparent ${moreOpt3 ? 'fixed' : 'hidden'}`}></div>
                {/* overlay more menu save */}
                <div onClick={handleCancel3} className={` top-0 left-0 w-full h-full z-20 bg-transparent ${saveOpt3 ? 'fixed' : 'hidden'}`}></div>
                
                {/* dropdown */}
                {profileMenu && (
                    <div className='w-[290px] h-fit max-h-[80vh] bg-white z-30 absolute top-[52px] left-3 rounded-xl shadow-custom ring-1 ring-border-line-color/0 overflow-y-auto'>
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
                    {/* Workspace 1 */}
                    <form onSubmit={handleSubmit1} className='relative group '>
                        <Link to={'/'} className={`${linkStyle} ${location.pathname === '/' ? 'bg-main-color/5 ' : 'hover:bg-stone-200/50 group-hover:bg-stone-200/50'}`}>
                            <LuHash className='text-xl text-lime-600  min-w-fit' />
                            <p className='line-clamp-1'>{w1}</p>
                            {saveOpt1 && <>
                                <div className='w-[100%] h-[100%] absolute left-0 z-30 bg-white flex items-center justify-center p-1'>
                                    <input type="text" name='workspace1' autoComplete='off' value={w1} onChange={(e) => setW1(e.target.value)} className=" h-full w-full bg-white ring-2 ring-main-color/50 rounded-md px-2 overflow-hidden" />
                                </div>
                            </>}

                        </Link>
                        <div onClick={showMoreMenuw1} className={` cursor-pointer absolute right-3 bottom-0 top-0 my-auto h-fit w-fit flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100`}>
                            <LuMoreHorizontal className='text-xl text-text-color/70 hover:text-text-color' />
                        </div>
                        {moreOpt1 && <>
                            <div className='absolute right-0 top-[100%] bg-white rounded-xl w-fit min-w-[150px] max-w-[170px] h-fit shadow-md z-20 ring-1 ring-border-line-color/50 p-2'>
                                <div onClick={renameW1} className={`${linkStyle} cursor-pointer hover:bg-stone-200/50`}>
                                    <LuPencilLine className='text-lg  min-w-fit' />
                                    <p className='line-clamp-1'>Rename</p>
                                </div>
                                <Link to={'/'} className={`${linkStyle} cursor-pointer hover:bg-stone-200/50`}>
                                    <LuTrash2 className='text-lg  min-w-fit text-red-500' />
                                    <p className='line-clamp-1 text-red-500'>Clear</p>
                                </Link>
                            </div>
                        </>}
                        {saveOpt1 && <>
                            <div className='absolute right-0 top-[100%] bg-white rounded-xl w-fit min-w-[150px] max-w-[170px] h-fit shadow-md z-20 ring-1 ring-border-line-color/50 p-2'>
                                <button type='submit' className={`${linkStyle} cursor-pointer hover:bg-stone-200/50`}>
                                    {authing ? <>
                                        <RiLoader5Fill className='text-xl animate-spinLoader  min-w-fit' />
                                        <p className='line-clamp-1'>Saving...</p>
                                    </> : <>
                                        <LuCheck className='text-lg  min-w-fit' />
                                        <p className='line-clamp-1'>Save Changes</p>
                                    </>}
                                </button>
                                <div onClick={handleCancel} className={`${linkStyle} cursor-pointer hover:bg-stone-200/50`}>
                                    <LuX className='text-lg  min-w-fit text-red-500' />
                                    <p className='line-clamp-1 text-red-500'>Cancel</p>
                                </div>
                            </div>
                        </>}
                    </form>
                    {/* Workspace 2 */}
                    <form onSubmit={handleSubmit2} className='relative group '>
                        <Link to={'/'} className={`${linkStyle} ${location.pathname === '/workspace/2' ? 'bg-main-color/5 ' : 'hover:bg-stone-200/50 group-hover:bg-stone-200/50'}`}>
                            <LuHash className='text-xl text-orange-600  min-w-fit' />
                            <p className='line-clamp-1'>{w2}</p>
                            {saveOpt2 && <>
                                <div className='w-[100%] h-[100%] absolute left-0 z-30 bg-white flex items-center justify-center p-1'>
                                    <input type="text" name='workspace2' autoComplete='off' value={w2} onChange={(e) => setW2(e.target.value)} className=" h-full w-full bg-white ring-2 ring-main-color/50 rounded-md px-2 overflow-hidden" />
                                </div>
                            </>}

                        </Link>
                        <div onClick={showMoreMenuw2} className={` cursor-pointer absolute right-3 bottom-0 top-0 my-auto h-fit w-fit flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100`}>
                            <LuMoreHorizontal className='text-xl text-text-color/70 hover:text-text-color' />
                        </div>
                        {moreOpt2 && <>
                            <div className='absolute right-0 top-[100%] bg-white rounded-xl w-fit min-w-[150px] max-w-[170px] h-fit shadow-md z-20 ring-1 ring-border-line-color/50 p-2'>
                                <div onClick={renameW2} className={`${linkStyle} cursor-pointer hover:bg-stone-200/50`}>
                                    <LuPencilLine className='text-lg  min-w-fit' />
                                    <p className='line-clamp-1'>Rename</p>
                                </div>
                                <Link to={'/'} className={`${linkStyle} cursor-pointer hover:bg-stone-200/50`}>
                                    <LuTrash2 className='text-lg  min-w-fit text-red-500' />
                                    <p className='line-clamp-1 text-red-500'>Clear</p>
                                </Link>
                            </div>
                        </>}
                        {saveOpt2 && <>
                            <div className='absolute right-0 top-[100%] bg-white rounded-xl w-fit min-w-[150px] max-w-[170px] h-fit shadow-md z-20 ring-1 ring-border-line-color/50 p-2'>
                                <button type='submit' className={`${linkStyle} cursor-pointer hover:bg-stone-200/50`}>
                                    {authing2 ? <>
                                        <RiLoader5Fill className='text-xl animate-spinLoader  min-w-fit' />
                                        <p className='line-clamp-1'>Saving...</p>
                                    </> : <>
                                        <LuCheck className='text-lg  min-w-fit' />
                                        <p className='line-clamp-1'>Save Changes</p>
                                    </>}
                                </button>
                                <div onClick={handleCancel2} className={`${linkStyle} cursor-pointer hover:bg-stone-200/50`}>
                                    <LuX className='text-lg  min-w-fit text-red-500' />
                                    <p className='line-clamp-1 text-red-500'>Cancel</p>
                                </div>
                            </div>
                        </>}
                    </form>
                    <div className='relative group '>
                        <Link to={'/work'} className={`${linkStyle} ${location.pathname === '/workspace/3' ? 'bg-main-color/5 ' : 'hover:bg-stone-200/50 group-hover:bg-stone-200/50'}`}>
                            <LuHash className='text-xl text-cyan-600  min-w-fit' />
                            <p className='line-clamp-1'>{w3}</p>
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