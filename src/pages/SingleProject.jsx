import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Sidebar from "../components/Sidebar";
import {
  LuArchive,
  LuArrowLeft,
  LuArrowRight,
  LuChevronsRight,
  LuHash,
  LuPlus,
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

function SingleProject() {
  const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_API;
  const { username, userEmail } = useOutletContext();
  const [profileMenu, setProfileMenu] = useState(false);
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

  // get project details
  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/getproject`, { params: { id, userEmail } })
        setProjectTitle(response.data.name)
        setProjectDesc(response.data.desc)
        setFetching(false)
        // console.log(response)
      }
      catch (error) {
        // console.log(error)
        if (error.response.status === 401) {
          // navigate('/')
        }
        if (error.response.status === 400) {
          // navigate('/')
        }
      }
    }

    getProject()
  }, [])

  return (
    <>
      {/* overlay */}
      <div
        onClick={() => setProfileMenu(false)}
        className={` top-0 left-0 w-full h-full z-20 bg-transparent ${profileMenu ? "fixed" : "hidden"
          }`}
      ></div>

      {/* dropdown */}
      {profileMenu && (
        <div className="w-[290px] h-fit max-h-[80vh] absolute top-[52px] right-3 rounded-xl shadow-custom ring-1 ring-border-line-color/0 overflow-y-auto z-30">
          <ProfileDropdownButtons username={username} />
        </div>
      )}

      <div
        className={`w-full h-svh flex-1 text-text-color flex flex-col bg-white transition-all duration-500 ease-in-out overflow-hidden `}
      >
        <div className="w-full h-fit flex flex-col justify-start items-start z-20 bg-white">
          <div className="w-full h-fit flex items-start justify-between px-5 pt-3">
            <div className=" min-h-[35px] flex items-center justify-start gap-0 ">
              <div className="flex items-center justify-start gap-3 text-sm mr-2">
                <button
                  title="Deadlines"
                  className="text-xl h-[25px] w-auto aspect-square flex items-center justify-center rounded-full transition bg-stone-100 hover:bg-stone-200"
                >
                  <LuArrowLeft />
                </button>
                <button
                  title="Deadlines"
                  className="opacity-40 pointer-events-none text-xl h-[25px] w-auto aspect-square flex items-center justify-center rounded-full transition bg-stone-100 hover:bg-stone-200"
                >
                  <LuArrowRight />
                </button>
              </div>
              <div className="flex items-center justify-start gap-[2px] text-sm text-text-color/70">
                <BreadCrumb name={"Workspaces"} status={"off"} link={"/"} /> /
                <BreadCrumb name={"Workspace 1"} status={"on"} link={"/"} /> /
                <BreadCrumb name={"project name"} status={"on"} link={"/"} />
              </div>
            </div>
            <div className="flex items-center justify-end gap-0">
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
                title="Move to trash"
                className="text-lg h-[34px] p-1 w-auto aspect-square flex items-center justify-center rounded-full transition hover:bg-stone-100 text-text-color/70 hover:text-red-500 "
              >
                <LuTrash2 />
              </button>
              <button
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
                <p className="h-[26px] w-auto aspect-square rounded-full bg-main-color/90 transition flex items-center justify-center text-sm font-semibold text-white">
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
          {fetching && <div className="fixed top-0 z-10 left-0 w-full h-full bg-white flex items-center justify-center">
            <img src="" alt="" />
          </div> }

          <div className="w-full h-fit pt-8 pb-3">
            <div className="w-full h-fit flex items-center justify-start mb-1 gap-1">
              <LuChevronsRight className='text-3xl text-lime-600' />
              {/* growing input */}
              <input
                ref={inputRef}
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="Project Title "
                className="text-3xl font-extrabold tracking-tight truncaten placeholder:text-text-color/70"
              />
            </div>
            <textarea
              type="text"
              value={projectDesc}
              onChange={(e) => setProjectDesc(e.target.value)}
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
              <div className="w-[300px] h-fit min-h-[100px] rounded-xl bg-stone-100 flex items-start justify-start p-3">
                <form className="w-full h-full flex flex-col">
                  <input type="text" className="w-full text-base font-semibold tracking-tight bg-transparent text-text-color/90" placeholder="Board title" autoFocus name="New board title" />
                  <textarea type="text" className="w-full text-sm font-normal tracking-tight bg-transparent text-text-color/70 min-h-[60px] resize-none text-ellipsis" placeholder="Description" autoFocus name="New board title" />
                  <button
                    type="submit"
                    title="Create a new board"
                    className=" bg-main-color text-white font-semibold px-3 rounded-md mt-4 inline-flex items-center justify-center py-1 w-fit h-fit"
                  >
                    <span className="text-sm tracking-tight">Create</span>
                  </button>
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
