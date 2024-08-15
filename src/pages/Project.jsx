import React, { useEffect, useRef, useState } from 'react'
import { BiSolidGridAlt } from 'react-icons/bi'
import { BsGrid, BsLayoutSidebar, BsViewStacked } from 'react-icons/bs'
import { CiGrid2H, CiGrid41 } from 'react-icons/ci'
import { FaPlus, FaRegStar } from 'react-icons/fa'
import { Link, useOutletContext, useParams } from 'react-router-dom'
import Emojis from '../components/Emojis'
import { EmojiArray } from '../content/data'
import { TbStack } from 'react-icons/tb'
import BreadCrumb from '../components/BreadCrumb'
import Sidebar from '../components/Sidebar'
import { LuActivity, LuArrowLeft, LuArrowRight, LuHash, LuInfo, LuLock, LuLogOut, LuSettings, LuShare2, LuStar, LuTimerReset, LuTrophy } from 'react-icons/lu'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import { RxTimer } from 'react-icons/rx'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { IoChevronDown } from 'react-icons/io5'
import { RiLoader5Fill } from 'react-icons/ri'
import ProfileDropdownButtons from '../components/ProfileDropdownButtons'
import { GiPadlock } from 'react-icons/gi'

function Project() {
  const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_API;
  const { username, userEmail } = useOutletContext()
  const [profileMenu, setProfileMenu] = useState(false)
  const [pemoji, setPemoji] = useState(null)
  const [pageTitle, setPageTitle] = useState('Gerayo Application')
  const [pageDesc, setPageDesc] = useState('Online Bus tracking and Ticketing system')
  const inputRef = useRef(null);
  const inputRef2 = useRef(null);
  // spaces
  const [w1, setW1] = useState(null)
  const [w2, setW2] = useState(null)
  const [w3, setW3] = useState(null)
  const { id } = useParams()


  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      // Create a temporary span to measure the text width
      const tempSpan = document.createElement('span');
      tempSpan.style.visibility = 'hidden';
      tempSpan.style.position = 'absolute';
      tempSpan.style.whiteSpace = 'pre';
      tempSpan.style.fontSize = getComputedStyle(input).fontSize;
      tempSpan.textContent = pageTitle || input.placeholder;

      document.body.appendChild(tempSpan);
      const width = tempSpan.offsetWidth + 100; // Add extra padding
      document.body.removeChild(tempSpan);

      input.style.width = `${width}px`;
    }
  }, [pageTitle]);

  useEffect(() => {
    const input2 = inputRef2.current;
    if (input2) {
      // Create a temporary span to measure the text width
      const tempSpan = document.createElement('span');
      tempSpan.style.visibility = 'hidden';
      tempSpan.style.position = 'absolute';
      tempSpan.style.whiteSpace = 'pre';
      tempSpan.style.fontSize = getComputedStyle(input2).fontSize;
      tempSpan.textContent = pageDesc || input2.placeholder;

      document.body.appendChild(tempSpan);
      const width = tempSpan.offsetWidth + 0; // Add extra padding
      document.body.removeChild(tempSpan);

      input2.style.width = `${width}px`;
    }
  }, [pageDesc]);

  const updateEmoji = () => {
    const storedEmojiPosition = parseInt(localStorage.getItem('projectsmoji'), 10) || 1;
    const foundEmoji = EmojiArray.find(e => e.position === storedEmojiPosition);
    if (foundEmoji) {
      setPemoji(foundEmoji.emoji);
    } else {
      setPemoji(null); // Handle case when emoji is not found
    }
  };

  useEffect(() => {
    // Initial update
    updateEmoji();

    // Add event listener for localStorage changes from other tabs
    window.addEventListener('storage', updateEmoji);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('storage', updateEmoji);
    };
  }, []);

  const ChangeEmoji = (position) => {
    localStorage.setItem('projectsmoji', position)
    updateEmoji()
  }

  // page title
  useEffect(() => {
    const fetchAllWorkShops = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/workspaces`, { params: { userEmail } });
        // console.log('Response data:', response);
        localStorage.setItem('upfront_user_name_w1', response.data.dbw1)
        localStorage.setItem('upfront_user_name_w2', response.data.dbw2)
        localStorage.setItem('upfront_user_name_w3', response.data.dbw3)
      } catch (err) {
        console.error('Error updating data:', err);
      }
    };

    fetchAllWorkShops()
  }, []);

  // getting space names + naming the page
  useEffect(() => {

  }, [])

  const showPMenu = () => {
    setProfileMenu(true)
  }

  return (
    <>
      {/* overlay */}
      <div onClick={() => setProfileMenu(false)} className={` top-0 left-0 w-full h-full z-20 bg-transparent ${profileMenu ? 'fixed' : 'hidden'}`}></div>

      {/* dropdown */}
      {profileMenu && (
        <div className='w-[290px] h-fit max-h-[80vh] absolute top-[52px] right-3 rounded-xl shadow-custom ring-1 ring-border-line-color/0 overflow-y-auto z-30'>
          <ProfileDropdownButtons username={username} />
        </div>
      )}

      <div className={`w-full h-full min-h-svh flex-1 text-text-color flex flex-col bg-white transition-all duration-500 ease-in-out `}>
        <div className='w-full h-fit flex items-start justify-between px-5 pt-3'>
          <div className=' min-h-[35px] flex items-center justify-start gap-0 '>
            <div className='flex items-center justify-start gap-3 text-sm mr-2'>
              <button title='Deadlines' className='text-xl h-[25px] w-auto aspect-square flex items-center justify-center rounded-full transition bg-stone-100 hover:bg-stone-200'>
                <LuArrowLeft />
              </button>
              <button title='Deadlines' className='opacity-40 pointer-events-none text-xl h-[25px] w-auto aspect-square flex items-center justify-center rounded-full transition bg-stone-100 hover:bg-stone-200'>
                <LuArrowRight />
              </button>
            </div>
            <div className='flex items-center justify-start gap-[2px] text-sm text-text-color/70'>
              <BreadCrumb name={'Workspaces'} status={'off'} link={'/'} /> /
              <BreadCrumb name={'Workspace 1'} status={'on'} link={'/'} /> /
              <BreadCrumb name={'project name'} status={'on'} link={'/'} />
            </div>
          </div>
          <div className='flex items-center justify-end gap-0'>
          <button title='Add collaborators' className="hover:bg-stone-100 transition text-xs font-semibold py-2 px-2 gap-1 rounded-lg inline-flex items-center">
              <LuShare2 className='text-lg' />
              <span className='text-xs font-semibold'>Share</span>
            </button>
            <button title='Mark as favorite' className='text-xl h-[34px] p-1 w-auto aspect-square flex items-center justify-center rounded-full transition hover:bg-stone-100'>
              <LuStar />
            </button>
            <button title='Dues' className='text-xl h-[34px] p-1 w-auto aspect-square flex items-center justify-center rounded-full transition hover:bg-stone-100'>
              <LuTimerReset />
            </button>
            <span className='w-[2px]'></span>
            <button onClick={showPMenu} className=' max-w-[120px] flex items-center justify-start gap-[2px] hover:bg-stone-100 transition p-1 rounded-lg'>
              <p className='h-[26px] w-auto aspect-square rounded-full bg-main-color hover:bg-main-color-hover transition flex items-center justify-center text-sm font-semibold text-white'>{username.charAt(0)}</p>
              <p className='truncate font-medium pl-[3px] text-xs'>{username}</p>
              <IoChevronDown className='min-w-[15px] text-xs' />
            </button>
          </div>
        </div>
        <div className='w-full h-full px-16 pt-8 pb-3 max-w-[1500px] mx-auto'>
          <div className='w-full h-fit flex items-start justify-start mb-1'>
            <div className='group h-fit w-fit transition hover:bg-stone-100 select-none relative flex items-center justify-center p-1 mr-1 rounded-lg cursor-pointer'>
              <p className='text-2xl bgora'>{pemoji}</p>
              <Emojis change={ChangeEmoji} />
            </div>
            {/* growing input */}
            <input
              ref={inputRef}
              type="text"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              placeholder="Project Title "
              className='text-3xl font-extrabold tracking-tight hover:ring-0 ring-slate-400/40 truncate'
            />
          </div>
          <input
            ref={inputRef2}
            type="text"
            value={pageDesc}
            onChange={(e) => setPageDesc(e.target.value)}
            placeholder="Project Description"
            className='text-base font-normal tracking-tight hover:ring-0 text-text-color/70 ring-slate-400/40 max-w-[800px] truncate resize-none'
          />
        </div>


        {/* Project section */}
        <div className='w-full h-full flex-1 bg-white px-16 pb-10 max-w-[1500px] mx-auto'>


        </div>

        {/* <button onClick={handleLogout} title='Login with Google' className='w-[200px] h-[40px] ring-1 ring-border-line-color rounded-md font-semibold flex items-center justify-center gap-1 transition hover:opacity-80'>
        Logout
      </button> */}
      </div>
    </>
  )
}

export default Project