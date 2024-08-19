import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { TbStack } from 'react-icons/tb'
import BreadCrumb from '../components/BreadCrumb'
import Sidebar from '../components/Sidebar'
import { LuArchive, LuHash, LuShare2, LuTrash2 } from 'react-icons/lu'
import axios from 'axios'
import { format } from 'date-fns';
import { RiLoader5Fill } from 'react-icons/ri'
import { setArray } from '../utils/hashUtils'
import AddNotes from '../components/AddNotes'
import { IoIosAddCircle } from 'react-icons/io'


function Projects() {
  const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_API;
  const { username, userEmail } = useOutletContext()
  const [pageTitle, setPageTitle] = useState('Workspace 1')
  const inputRef = useRef(null);
  // spaces
  const [w1, setW1] = useState(null)
  const [w2, setW2] = useState(null)
  const [w3, setW3] = useState(null)
  const [myProjects, setMyProjects] = useState([])
  const [fetchingProjects, setFetchingProjects] = useState(true)
  const dummyProjectNumber = ["", "", ""]
  const [myCollaborations, setMyCollatorations] = useState([])
  const navigate = useNavigate()
  const [createNew, setCreateNew] = useState(false);


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
    { id: "FN30498FHFF-032", progress: 26, progressClass: "w-[26%]" },
    { id: "FDINFE08434-952", progress: 64, progressClass: "w-[64%]" },
    { id: "0FINERW9F8H-349", progress: 34, progressClass: "w-[34%]" },
    { id: "ODIENF9IH49-345", progress: 58, progressClass: "w-[58%]" },
    { id: "PFONEFPIN04-3RE", progress: 19, progressClass: "w-[19%]" },
    { id: "NMY944IGNRE-969", progress: 81, progressClass: "w-[81%]" },
    { id: "FPEIR85342J-509-", progress: 100, progressClass: "w-[100%]" },
    { id: "2OINFOI3F93-490", progress: 44, progressClass: "w-[44%]" },
    { id: "OIFNEFOEIBN-113", progress: 8, progressClass: "w-[8%] " },
    { id: "0PFJEIRFE03-222", progress: 69, progressClass: "w-[69%] " },
  ]
  const count100Percent = projects.filter(project => project.progress === 100).length;

  const getProgressClasses = (progress) => {
    let classes = 'flex flex-col justify-center rounded-full overflow-hidden text-xs text-white text-center whitespace-nowrap transition duration-500';

    if (progress <= 100 && progress > 75) {
      classes += ' bg-green-500'; // Green for complete progress
    } else if (progress < 75 && progress > 50) {
      classes += ' bg-teal-500'; // Teal for progress between 76 and 99
    } else if (progress < 50 && progress > 25) {
      classes += ' bg-blue-400'; // Blue for progress between 51 and 75
    } else if (progress < 50) {
      classes += ' bg-red-400'; // Cyan for progress between 26 and 50
    }

    return classes;
  };

  const handleLogout = () => {
    localStorage.removeItem('upfront_user')
    localStorage.removeItem('upfront_user_name')
    localStorage.removeItem('upfront_user_name_w1')
    localStorage.removeItem('mycollaborations')
    setTimeout(() => {
      window.location.reload()
    }, 1000);
  }

  // page title
  useEffect(() => {
    const fetchAllWorkShops = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/workspaces`, { params: { userEmail } });
        // console.log('Response data:', response);
        localStorage.setItem('upfront_user_name_w1', response.data.dbw1)
      } catch (err) {
        console.error('Error updating data:', err);
      }
    };

    const getme = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/getme`, { params: { email: userEmail } });
        // console.log(response)
      } catch (error) {
        // console.log(error)
        if (error.response.status == 401) {
          handleLogout()
        }
      }
    };

    const getmyProjects = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/getmyprojects`, { params: { email: userEmail } });
        // console.log(response.data.projects)
        setMyProjects(response.data.projects)
        setFetchingProjects(false)
      } catch (error) {
        // console.log(error)
        if (error.response.status == 401) {
          handleLogout()
        }
      }
    };

    const getCollaborations = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/getcollaborations`, { params: { email: userEmail } });
        setMyCollatorations(response.data.projects)
        setArray('mycollaborations', response.data.projects);
        // const isArrayValid = verifyHashedArray('mycollaborations', JSON.stringify(response.data.projects));
      } catch (error) {
        console.log(error)
      }
    };


    getCollaborations()
    getmyProjects()
    fetchAllWorkShops()
    getme()
  }, [])

  // create new project
  const handleCreate = async () => {
    setCreateNew(true);
    try {
      const Imat = 'w1'
      const response = await axios.post(`${apiUrl}/api/createProject`, { name: '', desc: '', userEmail: userEmail, workspace: Imat, collaborations: userEmail });
      navigate(`/project/${response.data.id}`, { state: { workspace: response.data.workspace } })
    } catch (error) {
      setCreateNew(false);
      console.log(error.response)
    }
  };


  // getting space names + naming the page
  useEffect(() => {
    const luw1 = localStorage.getItem('upfront_user_name_w1') || 'Workspace 1'
    const luw2 = localStorage.getItem('upfront_user_name_w2') || 'Workspace 2'
    const luw3 = localStorage.getItem('upfront_user_name_w3') || 'Workspace 3'
    setW1(luw1)
    setW2(luw2)
    setW3(luw3)
    document.title = luw1 + " - Upfront";
  }, [])

  return (
    <div className='w-full flex items-start justify-start relative'>
      <Sidebar username={username} userEmail={userEmail} w1={w1} setW1={setW1} w2={w2} setW2={setW2} w3={w3} setW3={setW3} />
      <div className={`w-full h-full min-h-svh flex-1 text-text-color flex flex-col bg-white transition-all duration-500 ease-in-out z-10 `}>
        <div className='w-full h-fit flex items-start justify-between px-5 pt-3'>
          <div className=' min-h-[35px] flex items-center justify-start gap-0 '>
            <div className='flex items-center justify-start gap-[2px] text-sm text-text-color/70'>
              <BreadCrumb name={'Workspaces'} status={'off'} link={'/'} /> /
              <BreadCrumb name={w1} status={'on'} link={'/'} />
            </div>
          </div>
          <div className='flex items-center justify-end gap-0'>
            <button title='Archived' className="hover:bg-stone-100 transition text-xs font-semibold py-2 px-2 gap-1 text-text-color/70 hover:text-text-color rounded-lg inline-flex items-center">
              <LuArchive className='text-base' />
              <span className='text-xs font-medium tracking-tight'>Archived</span>
            </button>
            <button title='Trash' className="hover:bg-stone-100 transition text-xs font-semibold py-2 px-2 gap-1 text-text-color/70 hover:text-text-color rounded-lg inline-flex items-center">
              <LuTrash2 className='text-base' />
              <span className='text-xs font-medium tracking-tight'>Trash</span>
            </button>
            {/* <button title='create a new project' className="bg-gradient-to-tr from-main-color/60 to-main-color-hover hover:bg-main-color-hover transition text-white text-xs font-semibold py-2 px-4 gap-1 rounded-lg inline-flex items-center">
              <FaPlus />
              <span className='text-xs font-medium'>New project</span>
            </button> */}
            {/* <button title='Deadlines' className='text-xl h-[35px] w-auto aspect-square flex items-center justify-center rounded-full transition bg-stone-100 hover:bg-stone-200'>
              <RxTimer />
            </button> */}
            {/* <button title='Notifications' className='text-xl h-[35px] w-auto aspect-square flex items-center justify-center rounded-full transition bg-stone-100 hover:bg-stone-200'>
              <IoMdNotificationsOutline />
            </button> */}
            {/* <button title={username} className='h-[35px] w-auto aspect-square rounded-full bg-main-color hover:bg-main-color-hover transition flex items-center justify-center text-lg font-semibold text-white'>{username.charAt(0)}</button> */}
          </div>
        </div>
        <div className='w-full h-fit flex items-start justify-between px-10 py-5 max-w-[1500px] mx-auto'>
          <div className='flex items-center justify-start gap-1 '>
            <LuHash className='text-3xl text-lime-600' />
            <h1 className='text-3xl font-extrabold tracking-tight max-w-[300px] break-words'>{w1}</h1>
            <span className=' self-end text-xs font-medium bg-teal-600/10 mb-[4px] ml-1 py-[3px] px-2 tracking-tight rounded-md'>Free</span>
          </div>
        </div>

        {/* Projects section */}
        <div className='w-full h-full flex-1 bg-white px-10 pb-10 max-w-[1500px] mx-auto flex flex-col'>
          <div className='w-full h-fit flex items-end justify-between'>
            <p className='font-normal text-[13px] text-text-color/70'><span className='text-text-color font-medium'>{myProjects.length}</span> in Progress | <span className='text-text-color font-medium'>{myProjects.length}</span>  Completed</p>

          </div>
          {/* <span className='w-full h-[1px] bg-border-line-color/50 flex mt-2 '></span> */}
          {fetchingProjects ?
            <>
              <div className='w-full h-full flex-1 bg-transparent flex items-center justify-center flex-col gap-3'>
                <RiLoader5Fill className="text-3xl text-text-color/70 animate-spinLoader mb-10" />
              </div>
            </>
            :
            <>
              {myProjects.length < 1 ?
                <div className='w-full h-full flex-1 bg-transparent flex items-center justify-center flex-col gap-3 p-5 pb-20 max-md:pb-5'>
                  {/* <RiLoader5Fill className="text-3xl text-text-color/70 animate-spinLoader mb-10" /> */}
                  <AddNotes width={'w-[130px]'} />
                  <p className='font-normal text-sm text-text-color/70'>Let's create your first project</p>
                  <button
                    onClick={handleCreate}
                    className={`min-h-[34px] flex items-center gap-2 px-3 py-[5px] font-medium text-main-color tracking-tight rounded-md hover:bg-stone-200/50 ${createNew && 'pointer-events-none select-none'}`}
                  >
                    {createNew ? (
                      <div className="flex items-center gap-1">
                        <RiLoader5Fill className="text-2xl animate-spinLoader" />
                        <p className="line-clamp-1">Setting up your project... </p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <IoIosAddCircle className="text-2xl" />
                        <p className="line-clamp-1">New Project</p>
                      </div>
                    )}
                  </button>
                </div>
                :
                <div className='gridRespo pt-4 flex-1'>
                  {myProjects.map((project, index) => (
                    <div key={index} className='group z-10 relative w-full lg:max-w-full xl:max-w-[500px] 2xl:max-w-[750px] h-fit'>
                      <div className='absolute z-20 top-0 right-1 rounded-md flex items-center justify-center gap-0 bg-white p-1 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0'>
                        <button title='Archive Project' className={`h-[35px] w-auto aspect-square min-w-fit flex items-center justify-center gap-1 font-medium text-xs text-text-color/70 hover:text-text-color tracking-tight rounded-full line-clamp-1 relative cursor-pointer hover:bg-stone-200/60 `}>
                          <LuArchive className='text-xl  min-w-fit ' />
                        </button>
                        <button title='Delete Project' className={`h-[35px] w-auto aspect-square min-w-fit flex items-center justify-center gap-1 font-medium text-xs text-text-color/70 hover:text-red-500 tracking-tight rounded-full line-clamp-1 relative cursor-pointer hover:bg-stone-200/60 `}>
                          <LuTrash2 className='text-xl  min-w-fit ' />
                        </button>
                      </div>
                      <Link key={project._id} to={`/project/${project._id}`} className='group cursor-pointer w-full h-full p-4 rounded-xl shadow-sm bg-white group-hover:ring-2 group-hover:ring-main-color/60 ring-1 ring-border-line-color/50 flex flex-col relative'>
                        <h1 className='font-normal text-base leading-7 line-clamp-1'>{project.name === '' ? 'Untitled' : project.name}</h1>
                        <p className='line-clamp-1 leading-4 text-sm font-normal text-text-color/70 '>{project.name === '' ? 'no description' : project.desc}</p>
                        <div className='flex items-center justify-start mt-3'>
                          <div title={userEmail} className='h-8 w-auto aspect-square rounded-full flex items-center justify-center bg-main-color text-white text-base font-semibold border-[3px] border-white uppercase'>{userEmail.charAt(0)}</div>
                          {project.collaborations.filter(em => em !== userEmail).slice(0, 2).map((collab, index) => (
                            <div key={index} title={collab} className='h-8 w-auto aspect-square rounded-full flex items-center justify-center bg-purple-600 text-white text-base font-semibold ml-[-9px] border-[3px] border-white uppercase'>{collab.charAt(0)}</div>
                          ))}
                          {project.collaborations.length > 3 &&
                            <div className='flex items-center justify-center text-xs text-text-color/70 px-[2px] font-medium'>+{project.collaborations.length - 3}</div>
                          }
                        </div>
                        <div className='flex items-center gap-3 py-3'>
                          <h1 className='text-sm'>{project.progress}%</h1>
                          <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                            <div className={`flex flex-col justify-center rounded-full overflow-hidden text-xs text-white text-center whitespace-nowrap transition duration-500 ${getProgressClasses(project.progress)} ${project.progressClass}`}></div>
                          </div>
                          <h1 className='text-sm'>100%</h1>
                        </div>
                        <div className='w-full flex items-center justify-between'>
                          <p className='w-full flex items-center justify-start text-xs gap-1 font-medium text-text-color/70'>
                            <TbStack className='text-xl' />
                            {project.progress} Boards
                          </p>
                          <p className='w-full flex items-start justify-end text-xs font-medium text-text-color/70'>
                            {project.progress === 100 ? 'Completed' : format(new Date(project.createdAt), 'MMM dd, y')}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              }
            </>}
        </div>

        {/* <button onClick={handleLogout} title='Login with Google' className='w-[200px] h-[40px] ring-1 ring-border-line-color rounded-md font-semibold flex items-center justify-center gap-1 transition hover:opacity-80'>
        Logout
      </button> */}
      </div>
    </div>
  )
}

export default Projects