import React, { useEffect, useRef, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import Emojis from "../components/Emojis";
import { EmojiArray } from "../content/data";
import BreadCrumb from "../components/BreadCrumb";
import Sidebar from "../components/Sidebar";
import {
  LuArchive,
  LuArrowLeft,
  LuArrowRight,
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

function Project() {
  const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_API;
  const { username, userEmail } = useOutletContext();
  const [profileMenu, setProfileMenu] = useState(false);
  const [pemoji, setPemoji] = useState(null);
  const [pageTitle, setPageTitle] = useState("");
  const [pageDesc, setPageDesc] = useState("");
  const inputRef = useRef(null);
  const inputRef2 = useRef(null);
  // spaces
  const [w1, setW1] = useState(null);
  const [w2, setW2] = useState(null);
  const [w3, setW3] = useState(null);
  const { id } = useParams();
  // dragabble
  const dragref = useRef(); // We will use React useRef hook to reference the wrapping div:
  const { events } = useDraggable(dragref); // Now we pass the reference to the useDraggable hook:

  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      // Create a temporary span to measure the text width
      const tempSpan = document.createElement("span");
      tempSpan.style.visibility = "hidden";
      tempSpan.style.position = "absolute";
      tempSpan.style.whiteSpace = "pre";
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
      const tempSpan = document.createElement("span");
      tempSpan.style.visibility = "hidden";
      tempSpan.style.position = "absolute";
      tempSpan.style.whiteSpace = "pre";
      tempSpan.style.fontSize = getComputedStyle(input2).fontSize;
      tempSpan.textContent = pageDesc || input2.placeholder;

      document.body.appendChild(tempSpan);
      const width = tempSpan.offsetWidth + 0; // Add extra padding
      document.body.removeChild(tempSpan);

      input2.style.width = `${width}px`;
    }
  }, [pageDesc]);

  const updateEmoji = () => {
    const storedEmojiPosition =
      parseInt(localStorage.getItem("projectsmoji"), 10) || 1;
    const foundEmoji = EmojiArray.find(
      (e) => e.position === storedEmojiPosition
    );
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
    window.addEventListener("storage", updateEmoji);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("storage", updateEmoji);
    };
  }, []);

  const ChangeEmoji = (position) => {
    localStorage.setItem("projectsmoji", position);
    updateEmoji();
  };

  useEffect(() => {
    document.title = "New Project - Upfront";
  }, []);

  const showPMenu = () => {
    setProfileMenu(true);
  };

  return (
    <>
      {/* overlay */}
      <div
        onClick={() => setProfileMenu(false)}
        className={` top-0 left-0 w-full h-full z-20 bg-transparent ${
          profileMenu ? "fixed" : "hidden"
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
        <div className="w-full h-fit flex flex-col justify-start items-start">
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
          <div className="w-full h-full px-16 pt-8 pb-3 max-w-[1500px] mx-auto">
            <div className="w-full h-fit flex items-start justify-start mb-1">
              <div className="group h-fit w-fit transition hover:bg-stone-100 select-none relative flex items-center justify-center p-1 mr-1 rounded-lg cursor-pointer">
                <p className="text-2xl bgora">{pemoji}</p>
                <Emojis change={ChangeEmoji} />
              </div>
              {/* growing input */}
              <input
                ref={inputRef}
                type="text"
                value={pageTitle}
                onChange={(e) => setPageTitle(e.target.value)}
                placeholder="Project Title "
                className="text-3xl font-extrabold tracking-tight truncaten placeholder:text-text-color/70"
              />
            </div>
            <input
              ref={inputRef2}
              type="text"
              value={pageDesc}
              onChange={(e) => setPageDesc(e.target.value)}
              placeholder="a short description"
              className="text-base font-normal tracking-tight max-w-[800px] truncaten placeholder:text-text-color/70 resize-none"
            />
            <div className="w-full h-[1px] bg-border-line-color/50 my-5"></div>
          </div>
        </div>
        {/* Project section */}
        <div
          {...events}
          ref={dragref}
          className="w-full h-full max-h-full flex-1 px-16 pb-10 max-w-[1500px] mx-auto flex items-start justify-start overflow-auto scrollable-container relative "
        >
          <button
            title="Create a new board"
            className=" font-normal gap-1 text-text-color/70 hover:text-main-color px-2 inline-flex items-start justify-start w-full max-w-[300px] min-w-[300px] h-[200px] border-l-2 border-transparent hover:border-main-color/70"
          >
            <LuPlus className="text-lg" />
            <span className="text-sm tracking-tight">Add board</span>
          </button>
        </div>

        {/* <button onClick={handleLogout} title='Login with Google' className='w-[200px] h-[40px] ring-1 ring-border-line-color rounded-md font-semibold flex items-center justify-center gap-1 transition hover:opacity-80'>
        Logout
      </button> */}
      </div>
    </>
  );
}

export default Project;
