import React, { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { Link, useFetcher, useLocation, useNavigate, useOutletContext, useParams } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Sidebar from "../components/Sidebar";
import {
  LuArchive,
  LuArrowLeft,
  LuArrowRight,
  LuCheck,
  LuCheckCircle,
  LuChevronsRight,
  LuHash,
  LuPlus,
  LuRefreshCcw,
  LuRefreshCw,
  LuScissors,
  LuStar,
  LuTimerReset,
  LuTrash2,
  LuUsers2,
} from "react-icons/lu";
import axios from "axios";
import { IoChevronDown } from "react-icons/io5";
import ProfileDropdownButtons from "../components/ProfileDropdownButtons";
import { useDraggable } from "react-use-draggable-scroll";
import logo60 from '../assets/logo-60x60.png'
import { GiConsoleController } from "react-icons/gi";
import AddCollaborators from "../components/AddCollaborators";
import debounce from 'lodash/debounce';
import { RiLoader5Fill } from "react-icons/ri";
import DeleteContent from "../components/DeleteContent";


function SingleProject() {
  const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_API;
  const { username, userEmail } = useOutletContext();
  const [profileMenu, setProfileMenu] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [deleteMenu, setDeleteMenu] = useState(false)
  const inputRef = useRef();
  const navigate = useNavigate()
  // spaces
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const { id } = useParams();
  // dragabble
  const dragref = useRef(); // We will use React useRef hook to reference the wrapping div:
  const { events } = useDraggable(dragref); // Now we pass the reference to the useDraggable hook:
  // board
  const [addBoard, setAddBoard] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [fromSpace, setFromSpace] = useState('')
  const [collaborations, setCollaborations] = useState([])
  const location = useLocation()
  const { workspace } = location.state || {}
  const [users, setUsers] = useState('')
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)


  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      // Create a temporary span to measure the text width
      const tempSpan = document.createElement("span");
      tempSpan.style.visibility = "hidden";
      tempSpan.style.position = "absolute";
      tempSpan.style.whiteSpace = "pre";
      tempSpan.style.fontSize = getComputedStyle(input).fontSize;
      tempSpan.textContent = projectTitle || input.placeholder;

      document.body.appendChild(tempSpan);
      const width = tempSpan.offsetWidth + 100; // Add extra padding
      document.body.removeChild(tempSpan);

      input.style.width = `${width}px`;
    }
  }, [projectTitle]);

  useEffect(() => {
    document.title = "New Project - Upfront";
  }, []);

  const showPMenu = () => {
    setProfileMenu(true);
  };

  const showUserMenu = () => {
    setUserMenu(true)
  }

  const showDeleteMenu = () => {
    setDeleteMenu(true)
  }

  // get project details
  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/getproject`, { params: { id, userEmail } })
        setProjectTitle(response.data.name)
        setProjectDesc(response.data.desc)
        setFetching(false)
        setFromSpace(response.data.workspace)
        setCollaborations(response.data.collaborations)
      }
      catch (error) {
        // console.log(error)
        if (error.response.status === 401) {
          navigate('/')
        }
        if (error.response.status === 400) {
          navigate('/')
        }
      }
    }


    const getusers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/getusers`);
        setUsers(response.data)
      } catch (error) {
        console.log(error)
      }
    };

    getusers()
    getProject()
  }, [])

  const saveInputs = async (newInput1, newInput2) => {
    try {
      // console.log(newInput1, newInput2, id, userEmail)
      const response = await axios.patch(`${apiUrl}/api/updateprojectdetails`, {
        newTitle: newInput1,
        newDesc: newInput2,
        projectid: id,
        userEmail
      });
      setSaving(false)
    } catch (err) {
      console.error(err);
      setSaving(false)
    }
  };

  // Debounce the save function
  const debouncedSaveInputs = useCallback(debounce((newInput1, newInput2) => {
    saveInputs(newInput1, newInput2);
  }, 800), []);

  const handleInput1Change = (e) => {
    setSaving(true)
    const newInput1 = e.target.value;
    setProjectTitle(newInput1);
    debouncedSaveInputs(newInput1, projectDesc);
  };

  const handleInput2Change = (e) => {
    setSaving(true)
    const newInput2 = e.target.value;
    setProjectDesc(newInput2);
    debouncedSaveInputs(projectTitle, newInput2);
  };

  const handleTrashProject = async () => {
    setDeleting(true)
    try {
      const response = await axios.post(`${apiUrl}/api/movetotrash`, {
        projectId: id,
        userEmail
      });
      navigate('/')
    } catch (err) {
      console.log(err)
      setDeleting(false)
    }
  }

  return (
    <>
      {/* profile menu overlay */}
      <div
        onClick={() => setProfileMenu(false)}
        className={` top-0 left-0 w-full h-full z-30 bg-transparent ${profileMenu ? "fixed" : "hidden"
          }`}
      ></div>

      {/* User Menu overlay */}
      <div
        onClick={() => setUserMenu(false)}
        className={` top-0 left-0 w-full h-full z-30 bg-transparent ${userMenu ? "fixed" : "hidden"
          }`}
      ></div>

      {/* delete Menu overlay */}
      <div
        onClick={() => setDeleteMenu(false)}
        className={` top-0 left-0 w-full h-full z-30 bg-transparent ${deleteMenu ? "fixed" : "hidden"
          }`}
      ></div>

      {/* profile dropdown */}
      {profileMenu && (
        <div className="w-[290px] h-fit max-h-[80vh] absolute top-[52px] right-3 rounded-xl shadow-custom ring-1 ring-border-line-color/0 overflow-y-auto z-50">
          <ProfileDropdownButtons username={username} />
        </div>
      )}

      {/* Menu dropdown */}
      {userMenu && (
        <div className="w-[290px] h-fit max-h-[80vh] absolute top-[52px] right-[170px] rounded-xl shadow-custom ring-1 ring-border-line-color/0 overflow-y-auto z-50">
          <AddCollaborators users={users} username={username} collaborations={collaborations} userEmail={userEmail} id={id} setCollaborations={setCollaborations} />
        </div>
      )}

      {/* Delete Dropdown */}
      {deleteMenu && (
        <div className="w-[290px] h-fit max-h-[80vh] p-2 absolute top-[52px] right-[200px] rounded-xl shadow-custom ring-1 ring-border-line-color/0 overflow-y-auto z-50 bg-white">
          <p className="text-sm text-text-color/70 px-2 pt-2 pb-4"><span className="font-medium text-text-color">Warning! </span> Deleting this project will remove it from your workspace and move it to trash. Collaborations will be stashed for possible future restoration</p>
          <p className="text-sm text-text-color/70 px-2 pb-4"> Some fields, like <span className="font-medium text-text-color">'createdAt'</span> will reset during restore.</p>
          <div className="flex items-center justify-end">
            <button onClick={handleTrashProject} title='Trash' className="bg-stone-100 hover:bg-red-500 hover:text-white transition text-xs font-semibold h-[35px] py-0 px-3 w-full gap-1 text-text-color/70 rounded-lg inline-flex items-center justify-center">
              {deleting ?
                <RiLoader5Fill className="text-2xl animate-spinLoader" />
                :
                <>
                  <LuTrash2 className='text-lg' />
                  <span className='text-sm font-medium tracking-tight'>Move to Trash</span>
                </>
              }

            </button>
          </div>
        </div>
      )}

      <div
        className={`w-full h-svh flex-1 text-text-color flex flex-col bg-white transition-all duration-500 ease-in-out overflow-hidden `}
      >
        <div className="w-full h-fit flex flex-col justify-start items-start z-20 bg-white">
          <div className="w-full h-fit flex items-start justify-between px-5 pt-3">
            <div className=" min-h-[35px] flex items-center justify-start gap-0 ">
              <div className="flex items-center justify-start gap-3 text-sm mr-2">
                <Link to={`/`}
                  title="Deadlines"
                  className="text-xl h-[25px] w-auto aspect-square flex items-center justify-center rounded-full transition bg-stone-100 hover:bg-stone-200"
                >
                  <LuArrowLeft />
                </Link>
                <button
                  title="Deadlines"
                  className="opacity-40 pointer-events-none text-xl h-[25px] w-auto aspect-square flex items-center justify-center rounded-full transition bg-stone-100 hover:bg-stone-200"
                >
                  <LuArrowRight />
                </button>
              </div>
              <div className="flex items-center justify-start gap-[2px] text-sm text-text-color/70">
                <BreadCrumb name={"Workspaces"} status={"off"} link={"/"} /> /
                <BreadCrumb name={fromSpace} status={"on"} link={"/"} /> /
                <BreadCrumb name={"project name"} status={"on"} link={"/"} />
              </div>
            </div>
            <div className="flex items-center justify-end gap-0">
              <button
                title="File update status"
                className=" h-[34px] p-1 w-auto aspect-square flex items-center justify-center rounded-full transition hover:bg-stone-100 text-text-color/70 hover:text-text-color "
              >
                {saving ?
                  <LuRefreshCw className="text-lg animate-spinSlow" />
                  :
                  <LuCheck className="text-xl" />
                }
              </button>
              <button
                title="Move"
                className="text-lg h-[34px] p-1 w-auto aspect-square flex items-center justify-center rounded-full transition hover:bg-stone-100 text-text-color/70 hover:text-text-color "
              >
                <LuScissors />
              </button>
              <button
                title="Archive Project"
                className="text-xl h-[34px] p-1 w-auto aspect-square flex items-center justify-center rounded-full transition hover:bg-stone-100 text-text-color/70 hover:text-text-color "
              >
                <LuArchive />
              </button>
              <button
                onClick={showDeleteMenu}
                title="Move to trash"
                className="text-lg h-[34px] p-1 w-auto aspect-square flex items-center justify-center rounded-full transition hover:bg-stone-100 text-text-color/70 hover:text-red-500 "
              >
                <LuTrash2 />
              </button>
              <button
                onClick={showUserMenu}
                title="Manage Collaborators"
                className="text-xl h-[34px] p-1 w-auto aspect-square flex items-center justify-center rounded-full transition hover:bg-stone-100 text-text-color/70 hover:text-text-color "
              >
                <LuUsers2 />
              </button>

              <button
                title="Mark as favorite"
                className="text-xl h-[34px] p-1 w-auto aspect-square flex items-center justify-center rounded-full transition hover:bg-stone-100 text-text-color/70 hover:text-text-color "
              >
                <LuStar />
              </button>
              <button
                title="Dues"
                className="text-xl h-[34px] p-1 w-auto aspect-square flex items-center justify-center rounded-full transition hover:bg-stone-100 text-text-color/70 hover:text-text-color "
              >
                <LuTimerReset />
              </button>
              <span className="w-[2px]"></span>
              <button
                onClick={showPMenu}
                className=" max-w-[120px] flex items-center justify-start gap-[2px] hover:bg-stone-100  text-text-color/70 hover:text-text-color transition p-1 rounded-lg"
              >
                <p className="h-[26px] w-auto aspect-square rounded-full bg-main-color/90 transition flex items-center justify-center text-sm font-semibold text-white uppercase">
                  {username.charAt(0)}
                </p>
                <p className="truncate font-medium pl-[3px] text-xs">
                  {username}
                </p>
                <IoChevronDown className="min-w-[15px] text-xs" />
              </button>
            </div>
          </div>
        </div>


        {/* Project section */}
        <div className="w-full max-w-[1500px] h-full px-16 pt-8 pb-3 mx relative">
          {/* loader on fetch */}
          {fetching && <div className="fixed top-0 z-10 left-0 w-full h-full bg-white flex items-center justify-center flex-col">
            <img src={logo60} loading="lazy" className="animate-bounce h-12 saturate-100 aspect-square" />
            <p className='py-0 text-sm font-medium text-text-color/70 cursor-default'>loading..</p>
          </div>}

          <div className="w-full h-fit pt-8 pb-3">
            <div className="w-full h-fit flex items-center justify-start mb-1 gap-1">
              <LuChevronsRight className='text-3xl text-lime-600' />
              {/* growing input */}
              <input
                ref={inputRef}
                type="text"
                value={projectTitle}
                onChange={handleInput1Change}
                placeholder="Project Name "
                className="text-3xl font-extrabold tracking-tight truncaten placeholder:text-text-color/70"
              />
            </div>
            <textarea
              type="text"
              value={projectDesc}
              onChange={handleInput2Change}
              placeholder="a short description"
              className="text-sm font-normal tracking-tight w-full truncaten placeholder:text-text-color/70 text-text-color resize-y"
            ></textarea>
            <div className="w-full h-[1px] bg-border-line-color/50 mb-3"></div>
          </div>
          <div className="w-full h-full max-h-full flex-1 pb-10 flex items-start justify-start overflow-auto scrollable-container relative "
            {...events}
            ref={dragref}
          >
            {addBoard && (
              <div className="w-[300px] h-fit rounded-xl bg-white border flex items-start justify-start p-3">
                <form className="w-full h-full flex flex-col justify-between">
                  <input type="text" className="w-full text-base font-semibold tracking-tight bg-transparent text-text-color/90" placeholder="Board title" autoFocus name="New board title" />
                  <textarea type="text" className="w-full text-sm font-normal tracking-tight bg-transparent text-text-color/70 min-h-[60px] resize-none text-ellipsis" placeholder="Description" autoFocus name="New board title" />
                  <div className="flex items-center justify-end gap-1 ">
                    <div
                      onClick={() => setAddBoard(false)}
                      title="Create a new board"
                      className=" cursor-pointer active:scale-95 transition bg-stone-200 text-text-color font-semibold px-3 rounded-md mt-4 inline-flex items-center justify-center py-1 w-fit h-fit"
                    >
                      <span className="text-sm tracking-tight">Cancel</span>
                    </div>
                    <button
                      type="submit"
                      title="Create a new board"
                      className=" active:scale-95 transition bg-main-color text-white font-semibold px-3 rounded-md mt-4 inline-flex items-center justify-center py-1 w-fit h-fit"
                    >
                      <span className="text-sm tracking-tight">Add</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
            {!addBoard && (
              <button
                onClick={() => setAddBoard(true)}
                title="Create a new board"
                className=" font-normal gap-1 text-text-color/70 hover:text-main-color px-2 inline-flex items-start justify-start w-full max-w-[300px] min-w-[300px] h-[100px] border-l-2 border-transparent hover:border-main-color/70"
              >
                <LuPlus className="text-lg" />
                <span className="text-sm tracking-tight">Add board</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </>
  );
}

export default SingleProject;
