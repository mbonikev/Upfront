import React, { useEffect, useRef, useState } from 'react'
import { BiSolidGridAlt } from 'react-icons/bi'
import { BsGrid, BsLayoutSidebar, BsViewStacked } from 'react-icons/bs'
import { CiGrid2H, CiGrid41 } from 'react-icons/ci'
import { FaPlus, FaRegStar } from 'react-icons/fa'
import { Link, useOutletContext } from 'react-router-dom'
import Emojis from '../components/Emojis'
import { EmojiArray } from '../content/data'
import { TbStack } from 'react-icons/tb'
import BreadCrumb from '../components/BreadCrumb'
import Sidebar from '../components/Sidebar'
import { LuHash } from 'react-icons/lu'

function Projects() {
  const { username } = useOutletContext()
  const [pemoji, setPemoji] = useState(null)
  const [pageTitle, setPageTitle] = useState('Workspace 1')
  const inputRef = useRef(null);

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
      const width = tempSpan.offsetWidth + 10; // Add extra padding
      document.body.removeChild(tempSpan);

      input.style.width = `${width}px`;
    }
  }, [pageTitle]);

  const projects = [
    { progress: 26, progressClass: "w-[26%]" }, 
    { progress: 64, progressClass: "w-[64%]" }, 
    { progress: 34, progressClass: "w-[34%]" }, 
    { progress: 58, progressClass: "w-[58%]" }, 
    { progress: 19, progressClass: "w-[19%]" },
    { progress: 81, progressClass: "w-[81%]" }, 
    { progress: 100, progressClass: "w-[100%]" }, 
    { progress: 44, progressClass: "w-[44%]" }, 
    { progress: 8, progressClass: "w-[8%] " }, 
    { progress: 69, progressClass: "w-[69%] " },
  ]
  const count100Percent = projects.filter(project => project.progress === 100).length;


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

  const getProgressClasses = (progress) => {
    let classes = 'flex flex-col justify-center rounded-full overflow-hidden text-xs text-white text-center whitespace-nowrap transition duration-500';

    if (progress == 100) {
      classes += ' bg-green-500'; // Green for complete progress
    } else if (progress < 100 &&  progress > 75) {
      classes += ' bg-teal-500'; // Teal for progress between 76 and 99
    } else if (progress < 75 &&  progress > 50) {
      classes += ' bg-blue-500'; // Blue for progress between 51 and 75
    } else if (progress < 50 ) {
      classes += ' bg-red-400'; // Cyan for progress between 26 and 50
    } 

    return classes;
  };

  return (
    <div className='w-full flex items-start justify-start relative'>
      <Sidebar username={username} />
      <div className='w-full h-full min-h-svh text-text-color flex flex-col'>
        <div className='w-full h-fit flex items-start justify-between px-5 pt-5'>
          <div className='flex items-end justify-start gap-0 '>
            <div className='flex items-center justify-start gap-0 text-sm text-text-color/70'>
              <BreadCrumb name={'Projects'} status={'off'} link={'/'} /> /
            </div>
            {/* <div className='group h-fit w-fit transition hover:bg-stone-100 select-none relative flex items-center justify-center p-1 mr-1 rounded-lg cursor-pointer'>
              <p className='text-2xl bgora'>{pemoji}</p>
              <Emojis change={ChangeEmoji} />
            </div> */}
            {/* growing input */}
            {/* <input
              ref={inputRef}
              type="text"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              placeholder="Type here.."
              maxLength={20}
              className='text-3xl font-extrabold tracking-tight hover:ring-2 ring-slate-400/40 rounded-md'
            /> */}
            {/* <h1 className='text-3xl font-extrabold tracking-tight'>Projects</h1> */}
            {/* <span className=' self-end text-xs font-medium bg-teal-600/10 mb-[4px] ml-1 py-[3px] px-2 tracking-tight rounded-md'>Free</span> */}
          </div>
          <div className='flex items-center justify-end gap-2'>
            <button title='create a new project' className="bg-main-color hover:bg-main-color-hover transition text-white text-xs font-semibold py-[9px] px-5 gap-1 rounded-lg inline-flex items-center">
              <FaPlus />
              <span className='text-xs font-bold'>Create</span>
            </button>
            {/* <button title='Deadlines' className='text-xl h-[35px] w-auto aspect-square flex items-center justify-center rounded-full transition bg-stone-100 hover:bg-stone-200'>
              <RxTimer />
            </button> */}
            {/* <button title='Notifications' className='text-xl h-[35px] w-auto aspect-square flex items-center justify-center rounded-full transition bg-stone-100 hover:bg-stone-200'>
              <IoMdNotificationsOutline />
            </button> */}
            {/* <button title={username} className='h-[35px] w-auto aspect-square rounded-full bg-main-color hover:bg-main-color-hover transition flex items-center justify-center text-lg font-semibold text-white'>{username.charAt(0)}</button> */}
          </div>
        </div>
        <div className='w-full h-fit flex items-start justify-between px-16 py-5'>
          <div className='flex items-center justify-start gap-1 '>
            <LuHash className='text-3xl text-lime-600' />
            <h1 className='text-3xl font-extrabold tracking-tight'>Workspace 1</h1>
            <span className=' self-end text-xs font-medium bg-teal-600/10 mb-[4px] ml-1 py-[3px] px-2 tracking-tight rounded-md'>Free</span>
          </div>
        </div>

        {/* Projects section */}
        <div className='w-full h-full flex-1 bg-white px-16 pb-10'>
          <div className='w-full h-fit flex items-end justify-between'>
            <p className='font-normal text-[13px] text-text-color/70'><span className='text-text-color font-medium'>{projects.length}</span> in Progress | <span className='text-text-color font-medium'>{count100Percent}</span>  Completed</p>

          </div>
          {/* <span className='w-full h-[1px] bg-border-line-color/50 flex mt-2 '></span> */}
          <div className='gridRespo pt-4'>
            {projects.map((project, index) => (
              <Link key={index} to={'/'} className='w-full max-w-[350px] max-md:max-w-full h-fit p-4 rounded-xl shadow-sm bg-white transition hover:ring-2 hover:ring-main-color/60 ring-1 ring-border-line-color/50 flex flex-col'>
                <h1 className='font-normal text-sm leading-7'> Gerayo Application</h1>
                <p className='line-clamp-1 leading-4 text-sm font-normal text-text-color/70'>Online Bus tracking and Ticketing system</p>
                <div className='flex items-center justify-start mt-3'>
                  <div className='h-8 w-auto aspect-square rounded-full flex items-center justify-center bg-orange-600 text-white text-base font-semibold border-[3px] border-white'>J</div>
                  <div className='h-8 w-auto aspect-square rounded-full flex items-center justify-center bg-teal-600 text-white text-base font-semibold ml-[-9px] border-[3px] border-white'>E</div>
                  <div className='h-8 w-auto aspect-square rounded-full flex items-center justify-center bg-purple-600 text-white text-base font-semibold ml-[-9px] border-[3px] border-white'>I</div>
                  <div className='flex items-center justify-center text-xs text-text-color/70 px-[2px] font-medium'>+2</div>
                </div>
                <div className='flex items-center gap-3 py-3'>
                  <h1 className='text-sm'>{project.progress}%</h1>
                  <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                    <div className={`flex flex-col justify-center rounded-full overflow-hidden bg-main-color/70 text-xs text-white text-center whitespace-nowrap transition duration-500 ${getProgressClasses(project.progress)} ${project.progressClass}`}></div>
                  </div>
                  <h1 className='text-sm'>100%</h1>
                </div>
                <div className='w-full flex items-center justify-between'>
                  <p className='w-full flex items-center justify-start text-xs gap-1 font-medium text-text-color/70'>
                    <TbStack className='text-xl' />
                    {project.progress} Boards
                  </p>
                  <p className='w-full flex items-start justify-end text-xs font-medium text-text-color/70'>{project.progress === 100 ? 'Completed' : '9 days left'}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* <button onClick={handleLogout} title='Login with Google' className='w-[200px] h-[40px] ring-1 ring-border-line-color rounded-md font-semibold flex items-center justify-center gap-1 transition hover:opacity-80'>
        Logout
      </button> */}
      </div>
    </div>
  )
}

export default Projects