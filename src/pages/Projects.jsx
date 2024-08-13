import React, { useEffect, useState } from 'react'
import { BiSolidGridAlt } from 'react-icons/bi'
import { BsGrid, BsViewStacked } from 'react-icons/bs'
import { CiGrid2H, CiGrid41 } from 'react-icons/ci'
import { FaPlus, FaRegStar } from 'react-icons/fa'
import { FiPlus } from 'react-icons/fi'
import { HiOutlineViewGridAdd, HiViewGrid } from 'react-icons/hi'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { IoAdd, IoAddCircle, IoAddOutline, IoSearchOutline, IoStarOutline } from 'react-icons/io5'
import { MdFormatListBulleted, MdNotifications, MdViewStream } from 'react-icons/md'
import { RiNotification4Fill } from 'react-icons/ri'
import { RxTimer, RxViewGrid, RxViewHorizontal } from 'react-icons/rx'
import { TiThList } from 'react-icons/ti'
import { useOutletContext } from 'react-router-dom'
import Emojis from '../components/Emojis'
import { EmojiArray } from '../content/data'

function Projects() {
  const { username } = useOutletContext()
  const [pemoji, setPemoji] = useState(null)

  const handleLogout = () => {
    localStorage.removeItem('upfront_user')
    localStorage.removeItem('upfront_user_name')
    window.location.reload()
  }

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

  return (
    <div className='w-full h-full min-h-svh text-text-color flex flex-col'>
      <div className='w-full h-fit flex items-center justify-between px-10 py-5'>
        <div className='flex items-center justify-start gap-1 '>
          {/* <div className='group h-fit w-fit transition hover:bg-stone-200 select-none relative flex items-center justify-center p-1 rounded-lg cursor-pointer'>
            <p className='text-2xl bgora'>{pemoji}</p>
            <Emojis change={ChangeEmoji} />
          </div> */}
          <h1 className='text-3xl font-extrabold tracking-tight'>Projects</h1>
        </div>
        <div className='flex items-center justify-end gap-2'>
          <button title='create a new project' className="bg-stone-100 hover:bg-main-color-hover transition hover:text-white text-sm font-semibold py-[8px] px-4 gap-1 rounded-full inline-flex items-center">
            <FaPlus />
            <span className='text-xs'>New Project</span>
          </button>
          <button title='Deadlines' className='text-xl h-[35px] w-auto aspect-square flex items-center justify-center rounded-full transition bg-stone-100 hover:bg-stone-200'>
            <RxTimer />
          </button>
          <button title='Notifications' className='text-xl h-[35px] w-auto aspect-square flex items-center justify-center rounded-full transition bg-stone-100 hover:bg-stone-200'>
            <IoMdNotificationsOutline />
          </button>
          <button title={username} className='h-[35px] w-auto aspect-square rounded-full bg-main-color hover:bg-main-color-hover transition flex items-center justify-center text-lg font-semibold text-white'>{username.charAt(0)}</button>
        </div>
      </div>

      {/* Projects section */}
      <div className='w-full h-full flex-1 px-10 py-6'>
        <div className='w-full h-fit flex items-center justify-between'>
          <p className='font-medium text-sm text-text-color/60'><span className='text-text-color font-bold'>20</span> Open Projects | <span className='text-text-color font-bold'>20</span>  Closed Projects</p>
          <div className='flex items-center justify-end gap-0'>
            <button title='search' className='text-xl h-[35px] w-auto aspect-square flex items-center justify-center rounded-full transition bg-transparent hover:bg-stone-200'>
              <IoSearchOutline />
            </button>
            <button title='search' className='text-xl h-[35px] w-auto aspect-square flex items-center justify-center rounded-full transition bg-transparent hover:bg-stone-200'>
              <IoStarOutline />
            </button>
          </div>
        </div>
        <span className='w-full h-[1px] bg-stone-100 flex mt-2 '></span>
      </div>

      <button onClick={handleLogout} title='Login with Google' className='w-[200px] h-[40px] ring-1 ring-border-line-color rounded-md font-semibold flex items-center justify-center gap-1 transition hover:opacity-80'>
        Logout
      </button>
    </div>
  )
}

export default Projects