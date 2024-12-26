import React, { useEffect, useRef, useState } from "react";
import { IoIosAddCircle, IoMdNotificationsOutline } from "react-icons/io";
import { IoChevronDown, IoFolderOpen } from "react-icons/io5";
import {
  LuActivity,
  LuArrowUpRight,
  LuBadgeX,
  LuBell,
  LuCheck,
  LuCheckCircle,
  LuChevronDown,
  LuChevronsUpDown,
  LuCog,
  LuCrown,
  LuFlag,
  LuFlagTriangleRight,
  LuHash,
  LuHourglass,
  LuInfo,
  LuLink,
  LuLogOut,
  LuMoreHorizontal,
  LuPen,
  LuPencil,
  LuPencilLine,
  LuPlus,
  LuSearch,
  LuSettings,
  LuSparkles,
  LuStar,
  LuTimerReset,
  LuTrash2,
  LuTrophy,
  LuUser2,
  LuWorkflow,
  LuX,
} from "react-icons/lu";
import { BsLayoutSidebar } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiLoader5Fill, RiUserSharedLine } from "react-icons/ri";
import axios from "axios";
import ProfileDropdownButtons from "./ProfileDropdownButtons";
import { getArray } from "../utils/hashUtils";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import SearchModal from "./SearchModal";
import Reveal, { Fade } from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import { PiArrowUpRightBold } from "react-icons/pi";
import toast from "react-hot-toast";
import { GoHome } from "react-icons/go";
import CreateWorkspace from "./CreateWorkspace";
const customAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateX(-10px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

function Sidebar({ username, userEmail, setPageTitle }) {
  const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_API;
  const [profileMenu, setProfileMenu] = useState(false);
  const [logoutAnimate, setLogoutAnimate] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);
  const [moreOpt1, setMoreOpt1] = useState(false);
  const moreButtonRef = useRef(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [saveOpt1, setSaveOpt1] = useState(false);
  const [saveOpt3, setSaveOpt3] = useState(false);
  const [workspaces, setWorkspaces] = useState([]);
  const [originalSpaceName, setOriginalSpaceName] = useState("");
  const [spaceName, setSpaceName] = useState("");
  const [spaceId, setSpaceId] = useState("");
  const [spaceNumber, setSpaceNumber] = useState("");
  const formRef = useRef(null);
  const [createNew, setCreateNew] = useState(false);
  const [myCollaborations, setMyCollatorations] = useState([]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [AnimateShowSearchModal, setAnimateShowSearchModal] = useState(false);
  const [createWpsModal, setCreateWpsModal] = useState(false);
  const [AnimatecreateWpsModal, setAnimatecreateWpsModal] = useState(false);
  // workspace1
  const handleUpdateWorkSpace = async (e) => {
    e.preventDefault();
    setAuthing(true);
    try {
      const response = await axios.patch(`${apiUrl}/api/updateWorkspace`, {
        spaceId,
        spaceName,
      });
      const updatedWorkspace = response.data.workspace; // Updated workspace returned from the API

      // Update localStorage
      const storedWorkspaces =
        JSON.parse(localStorage.getItem("upfront_ws")) || [];
      const updatedWorkspaces = storedWorkspaces.map((workspace) =>
        workspace._id === updatedWorkspace._id ? updatedWorkspace : workspace
      );
      localStorage.setItem("upfront_ws", JSON.stringify(updatedWorkspaces));

      // Update state
      setWorkspaces(updatedWorkspaces);
      setMoreOpt1(false);
      setSaveOpt1(false);
      setAuthing(false);
    } catch (err) {
      // console.error("Error updating data:", err);
      setAuthing(false);
    }
  };
  const showPMenu = () => {
    setProfileMenu(true);
  };

  // getting space names
  useEffect(() => {
    const workspaces = JSON.parse(localStorage.getItem("upfront_ws")) || [];
    setWorkspaces(workspaces);
  }, []);

  // show more
  const showMoreMenu = (space) => {
    setSpaceName(space.workspace_name);
    setSpaceId(space._id);
    setOriginalSpaceName(space.workspace_name);
    if (moreButtonRef.current) {
      const rect = moreButtonRef.current.getBoundingClientRect();

      // Get the screen dimensions
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      // Initial position based on the button's position
      let newTop = rect.bottom + window.scrollY;
      let newLeft = rect.left + window.scrollX;

      // Adjust if menu would overflow on the right side
      const menuWidth = 155; // Set the desired width of the menu
      if (newLeft + menuWidth > screenWidth) {
        newLeft = screenWidth - menuWidth; // Keep the menu within the screen
      }

      // Adjust if the menu would overflow on the bottom side
      const menuHeight = 210; // Set the desired height of the menu
      if (newTop + menuHeight > screenHeight) {
        newTop = screenHeight - menuHeight; // Keep the menu within the screen
      }

      // Set the adjusted position
      setMenuPosition({ top: newTop - 20, left: newLeft + 33 });
      setMoreOpt1(true);
    }
  };

  // rename workspace
  const renameWorkspace = () => {
    setMoreOpt1(false);
    setSaveOpt1(true);
  };

  // renaming
  const handelRenaming = (e) => {
    setSpaceName(e.target.value);
    setPageTitle(e.target.value);
  };
  const handleCancel = () => {
    setMoreOpt1(false);
    setSaveOpt1(false);
    setSpaceName(originalSpaceName);
    setPageTitle(originalSpaceName);
  };

  // create new project
  const handleCreate = async () => {
    setCreateNew(true);
    try {
      const Imat = "w1";
      const response = await axios.post(`${apiUrl}/api/createProject`, {
        name: "",
        desc: "",
        userEmail: userEmail,
        workspace: Imat,
        collaborations: userEmail,
      });
      navigate(`/project/${w1}/${response.data.id}`, {
        state: { workspace: response.data.workspace },
      });
    } catch (error) {
      setCreateNew(false);
      // console.log(error.response);
    }
  };

  // get collabs
  const retrieveArray = getArray("mycollaborations") ?? [];
  const linkStyle =
    "h-[32px] w-full flex items-center gap-2 px-2 py-[7px] font-normal dark:text-[#b8b8b8] dark:hover:bg-[#2c2c2c] text-text-color tracking-tight rounded-lg line-clamp-1 relative select-none active:bg-stone-100 dark:active:bg-[#323232]";

  const getDate = new Date();
  const Today = getDate.getDate();

  const handleShowSearch = () => {
    setShowSearchModal(true);
    setTimeout(() => {
      setAnimateShowSearchModal(true);
    }, 50);
  };
  const handleHideSearch = () => {
    setAnimateShowSearchModal(false);
    setTimeout(() => {
      setShowSearchModal(false);
    }, 300);
  };

  const handleCreateWps = () => {
    setCreateWpsModal(true);
    setTimeout(() => {
      setAnimatecreateWpsModal(true);
    }, 50);
  };

  const handleHideCreateWps = () => {
    setAnimatecreateWpsModal(false);
    setTimeout(() => {
      setCreateWpsModal(false);
    }, 300);
  };

  const HandleSaveWps = (e) => {
    
  }

  // ctrl + s
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.toLowerCase() === "s" && event.altKey) {
        event.preventDefault();
        handleShowSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // copy link
  const handleLinkCopy = (id) => {
    navigator.clipboard
      .writeText(`https://upfront.onrender.com/#/workspaces/${id}`)
      .then(() => toast.success("Link copied"));
    setMoreOpt1(false);
  };

  // close on esc
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        if (moreOpt1 === true || saveOpt1 === true) {
          handleCancel();
        }
        setProfileMenu(false);
        handleHideCreateWps()
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleCancel]);

  return (
    <div className="w-[256px] min-w-[256px] max-h-svh sticky top-0 z-20">
      <div className=" relative w-full h-full ">
        {/* overlay */}
        <div
          onClick={() => setProfileMenu(false)}
          className={` top-0 left-0 w-full h-full z-20 bg-transparent ${
            profileMenu ? "fixed" : "hidden"
          }`}
        ></div>
        {/* overlay more menu */}
        <div
          onClick={handleCancel}
          className={` top-0 left-0 w-full h-full z-20 bg-transparent ${
            moreOpt1 ? "fixed" : "hidden"
          }`}
        ></div>
        {/* overlay more menu save */}
        <div
          onClick={handleCancel}
          className={` top-0 left-0 w-full h-full z-20 bg-transparent ${
            saveOpt1 ? "fixed" : "hidden"
          }`}
        ></div>
        {/* search overlay */}
        {showSearchModal && (
          <div
            onClick={handleHideSearch}
            className={` top-0 left-0 w-full h-full z-20 dark:bg-black/40 backdrop-blur-[3px] fixed transition-all duration-300 ${
              AnimateShowSearchModal ? "opacity-100 " : "opacity-0"
            }`}
          ></div>
        )}
        {/* search modal */}
        {showSearchModal && (
          <div
            className={`w-fit h-full max-h-[63%] 2xl:max-h-[500px] bg-[#202020] dark:bg-[#252525] rounded-[25px] fixed top-0 left-0 right-0 bottom-0 m-auto shadow-custom ring-1 ring-border-line-color/0 z-30 transition-all duration-150 
              ${
                AnimateShowSearchModal
                  ? "opacity-100"
                  : "opacity-0 translate-y-[10px]"
              }
              `}
          >
            <SearchModal Show={handleShowSearch} Hide={handleHideSearch} />
          </div>
        )}
        {/* create workspace overlay */}
        {createWpsModal && (
          <div
            onClick={handleHideCreateWps}
            className={` top-0 left-0 w-full h-full z-20 bg-black/20 dark:bg-black/40 backdrop-blur-[3px] fixed transition-all duration-300 ${
              AnimatecreateWpsModal ? "opacity-100 " : "opacity-0"
            }`}
          ></div>
        )}
        {/* create workspace modal */}
        {createWpsModal && (
          <div
            className={`w-fit h-fit max-h-[63%] max-w-[90%] 2xl:max-h-[500px] bg-white dark:bg-[#2c2c2c] overflow-clip rounded-[12px] fixed top-0 left-0 right-0 bottom-0 m-auto shadow-custom ring-1 ring-border-line-color/0 z-30 transition-all duration-150 
              ${
                AnimatecreateWpsModal
                  ? "opacity-100"
                  : "opacity-0 translate-y-[10px]"
              }
              `}
          >
            <CreateWorkspace hide={handleHideCreateWps} create={handleCreateWps} />
          </div>
        )}
        {/* dropdown */}
        {profileMenu && (
          <div className="min-w-[280px] h-fit max-h-[80vh] absolute top-[50px] left-3 rounded-xl shadow-custom ring-1 ring-border-line-color/0 overflow-y-auto z-30">
            <ProfileDropdownButtons username={username} userEmail={userEmail} />
          </div>
        )}
        <div className="w-full h-full border-r-[2px] border-stone-200/70 dark:border-[#313131a6] bg-white dark:bg-[#202020] dark:text-[#b8b8b8] flex flex-col gap-[2px] p-2 text-sm min-h-svh max-h-svh overflow-y-auto overscroll-contain">
          {/* 1 */}
          <div className="w-full h-fit mb-4 flex items-center justify-between">
            <div className="w-full h-fit">
              <button
                onClick={showPMenu}
                className="dark:text-[#b8b8b8] text-text-color w-fit flex items-center justify-start gap-[2px] hover:bg-stone-100 dark:hover:bg-[#2c2c2c] transition px-1.5 py-1.5 rounded-lg"
              >
                <p className="h-[25px] w-auto aspect-square rounded-full bg-main-color dark:bg-[#424242] text-white transition flex items-center justify-center text-sm font-semibold uppercase">
                  {username.charAt(0)}
                </p>
                <p className="truncate  max-w-[120px] flex-1 text-left font-medium text-sm tracking-tight pl-[6px]">
                  {username}
                </p>
                <LuChevronDown className="text-base ml-[5px] " />
              </button>
            </div>
            <button
              onClick={handleCreate}
              className={`h-[32px] aspect-square flex items-center justify-center font-medium text-text-color dark:text-stone-300 tracking-tight rounded-md hover:bg-stone-100 dark:hover:bg-[#2c2c2c] ${
                createNew && "pointer-events-none select-none"
              }`}
            >
              {createNew ? (
                <div className="flex items-center gap-2">
                  <RiLoader5Fill className="text-2xl animate-spinLoader" />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <LuPlus className="text-lg" />
                </div>
              )}
            </button>
          </div>
          {/* 2 */}
          <div className="flex-1 flex flex-col gap-[3px]">
            <Link
              to={"/"}
              className={`${linkStyle} hover:bg-stone-100 group-hover:bg-stone-100 ${
                location.pathname === `/`
                  ? "bg-stone-200/50 dark:bg-[#2c2c2c]"
                  : ""
              }`}
            >
              <GoHome className="text-text-color/50 dark:text-[#858585] text-xl  min-w-fit" />
              <p className="line-clamp-1">Overview</p>
            </Link>
            <button
              onClick={handleShowSearch}
              className={`${linkStyle} hover:bg-stone-100 group-hover:bg-stone-100`}
            >
              <div className="w-full flex items-center justify-between gap-2">
                <div className="flex items-center justify-start gap-2">
                  <LuSearch className="text-text-color/50 dark:text-[#858585] text-xl  min-w-fit" />
                  <p className="line-clamp-1">Search</p>
                </div>
                {/* shortcuts */}
                <div className="flex items-center justify-center gap-1">
                  <span className="bg-[#ececec] dark:bg-[#383838] text-[#a5a5a5] dark:text-[#afafaf] text-[10px] font-medium px-1.5 py-0 rounded-md border-b border-[#d4d4d4] dark:border-[#555555]">
                    Alt
                  </span>
                  <span className="text-[#a5a5a5] dark:text-[#afafaf]">+</span>
                  <span className="bg-[#ececec] dark:bg-[#383838] text-[#a5a5a5] dark:text-[#afafaf] text-[10px] font-medium px-1.5 py-0 rounded-md border-b border-[#d4d4d4] dark:border-[#555555]">
                    S
                  </span>
                </div>
              </div>
            </button>
            <Link
              to={"/ai"}
              className={`${linkStyle} hover:bg-stone-100 group-hover:bg-stone-100 ${
                location.pathname === `/ai`
                  ? "bg-stone-200/50 dark:bg-[#2c2c2c]"
                  : ""
              }`}
            >
              <LuSparkles className="text-text-color/50 dark:text-[#858585] text-xl  min-w-fit" />
              <p className="line-clamp-1">Upfront AI</p>
            </Link>
            <Link
              to={"/"}
              className={`${linkStyle} hover:bg-stone-100 group-hover:bg-stone-100`}
            >
              <RiUserSharedLine className="text-text-color/50 dark:text-[#858585] text-xl  min-w-fit" />
              <p className="line-clamp-1">Shared with me</p>
            </Link>
            <p className="flex items-center justify-between gap-2 pt-[13px] pb-[7px] px-[10px] font-medium dark:text-[#f1f1f1]/70 text-text-color/70 tracking-tight">
              Calendar
            </p>
            <Link
              to={"/"}
              className={`${linkStyle} hover:bg-stone-100 group-hover:bg-stone-100`}
            >
              <LuTimerReset className="text-text-color/50 dark:text-[#858585] text-xl  min-w-fit" />
              <p className="line-clamp-1 w-full flex items-center justify-between">
                <span>Dues</span>
                <span className="px-[5px] opacity-50 text-sm font-medium">
                  0
                </span>
              </p>
            </Link>
            <Link
              to={"/"}
              className={`${linkStyle} hover:bg-stone-100 group-hover:bg-stone-100`}
            >
              <div className="text-text-color/50 dark:text-[#858585] text-xl bg-red-200/0 w-[20px] min-w-[20px] h-[20px] relative pt-[1px] flex flex-col items-center justify-center gap-[2px]">
                <div className="w-[17px] h-[2px] min-h-[2px] rounded-[5px] bg-text-color/50 dark:bg-[#858585] z-10 relative"></div>
                <div className="w-fit h-fit text-text-color/50 dark:text-[#858585] text-[14px] font-semibold leading-none z-10 tracking-tight">
                  {Today}
                </div>
              </div>
              <p className="line-clamp-1 w-full flex items-center justify-between">
                <span>Today</span>
                <span className="px-[5px] opacity-50 text-sm font-medium">
                  0
                </span>
              </p>
            </Link>
            <p className="group flex items-center justify-start gap-2 mt-[6px] rounded-lg py-[7px] pr-0 pl-[8px] font-medium dark:text-[#b8b8b8]/70 text-text-color/70 tracking-tight select-none  w-full">
              <LuChevronDown className="p-[2px] cursor-pointer hover:bg-stone-100 dark:hover:bg-[#2c2c2c] dark:active:brightness-125 rounded-md h-[20px] w-auto aspect-square" />
              <span className="flex-1">Workspaces</span>
              <button
                onClick={handleCreateWps}
                className="flex items-center justify-center text-lg cursor-pointer hover:text-text-color dark:hover:text-[#b8b8b8] rounded-md h-[22px] w-auto aspect-square opacity-0 group-hover:opacity-100 transition duration-75"
              >
                <LuPlus />
              </button>
            </p>
            {/* Workspace */}
            {workspaces && workspaces.length > 0 ? (
              workspaces.map((space, index) => (
                <form
                  key={index}
                  onSubmit={handleUpdateWorkSpace}
                  className="relative group mb-10 "
                >
                  <Link
                    to={`/workspaces/${space._id}`}
                    className={`${linkStyle} ${
                      location.pathname === `/workspaces/${space._id}`
                        ? "bg-stone-200/50 dark:bg-[#2c2c2c]"
                        : ""
                    }`}
                  >
                    <IoFolderOpen className="text-xl text-text-color/50 dark:text-[#858585]" />
                    <p className="line-clamp-1 max-w-[70%]">
                      {space.workspace_name}
                    </p>
                  </Link>
                  {saveOpt1 && (
                    <>
                      <div className="w-[100%] h-[100%] absolute top-0 left-0 z-30 text-text-color/50 dark:text-[#858585] bg-sidebar-color dark:bg-[#202020] flex items-center justify-center gap-3 py-1 pl-[8px]">
                        {authing ? (
                          <>
                            <RiLoader5Fill className="text-xl animate-spinLoader  min-w-fit" />
                          </>
                        ) : (
                          <>
                            <IoFolderOpen className="text-xl  min-w-fit" />
                          </>
                        )}
                        <input
                          type="text"
                          autoFocus
                          name="workspace_name"
                          autoComplete="off"
                          value={spaceName}
                          onChange={handelRenaming}
                          className=" h-full w-full bg-white dark:text-[#f1f1f1] dark:bg-[#2c2c2c] text-text-color ring-2 ring-main-color/50 rounded-md px-2 overflow-hidden"
                        />
                      </div>
                    </>
                  )}
                  <div
                    ref={moreButtonRef}
                    onClick={() => showMoreMenu(space)}
                    className={`cursor-pointer absolute right-1 bottom-0 top-0 my-auto h-fit w-fit flex items-center justify-center opacity-0 group-hover:opacity-100 px-2 ${
                      moreOpt1 && "opacity-100"
                    }`}
                  >
                    <LuMoreHorizontal className="text-xl dark:text-[#f1f1f1]/70 text-text-color/70 dark:hover:text-white text-text-color" />
                  </div>

                  {moreOpt1 && (
                    <div
                      style={{ top: menuPosition.top, left: menuPosition.left }}
                      className="fixed bg-white dark:bg-[#2c2c2c] dark:shadow-custom2 rounded-xl w-fit min-w-[230px] h-fit shadow-md z-[1000] ring-1 ring-border-line-color/50 dark:ring-stone-600/30 p-1 transition-all ease-in-out duration-300 overflow-clip"
                    >
                      <Reveal
                        keyframes={customAnimation}
                        duration={230}
                        triggerOnce
                        damping={0.1}
                        cascade={true}
                      >
                        <button
                          onClick={() => handleLinkCopy(space._id)}
                          className={`${linkStyle} hover:bg-stone-100 dark:hover:bg-[#383838]`}
                        >
                          <LuLink className="text-base min-w-fit" />
                          <p className="line-clamp-1">Copy link</p>
                        </button>
                        <button
                          onClick={renameWorkspace}
                          className={`${linkStyle} hover:bg-stone-100 dark:hover:bg-[#383838]`}
                        >
                          <LuPencil className="text-base min-w-fit" />
                          <p className="line-clamp-1">Rename</p>
                        </button>
                        <button
                          className={`${linkStyle} hover:text-red-500 hover:bg-stone-100 dark:hover:bg-[#383838]`}
                        >
                          <LuTrash2 className="text-base min-w-fit" />
                          <p className="line-clamp-1">Move to Trash</p>
                        </button>
                        <div className="w-full h-[1px] bg-[#efefef] dark:bg-[#323232] my-1"></div>
                        <button
                          className={`${linkStyle} hover:bg-stone-100 dark:hover:bg-[#383838]`}
                        >
                          <PiArrowUpRightBold className="text-base min-w-fit" />
                          <p className="line-clamp-1">Open in new tab</p>
                        </button>
                      </Reveal>
                    </div>
                  )}

                  {/* {saveOpt1 && (
                <>
                  <div className="absolute right-0 top-[110%] bg-white dark:bg-[#2c2c2c] dark:shadow-custom2 rounded-xl w-fit min-w-[75%] max-w-[170px] h-fit shadow-md z-20 ring-1 ring-border-line-color/50 dark:ring-stone-600/30 p-1">
                    <button
                      type="submit"
                      className={`${linkStyle} cursor-pointer hover:bg-stone-100 dark:hover:bg-[#383838]`}
                    >
                      {authing ? (
                        <>
                          <RiLoader5Fill className="text-xl animate-spinLoader  min-w-fit" />
                          <p className="line-clamp-1">Saving...</p>
                        </>
                      ) : (
                        <>
                          <LuCheck className="text-lg  min-w-fit" />
                          <p className="line-clamp-1">Save Changes</p>
                        </>
                      )}
                    </button>
                    <div
                      onClick={handleCancel}
                      className={`${linkStyle} cursor-pointer hover:bg-stone-100 dark:hover:bg-[#383838]`}
                    >
                      <LuX className="text-lg  min-w-fit text-red-500" />
                      <p className="line-clamp-1 text-red-500">Cancel</p>
                    </div>
                  </div>
                </>
              )} */}
                </form>
              ))
            ) : (
              <></>
            )}
          </div>
          {/* 3 */}
          <div className="w-full h-fit flex flex-col items-center justify-between gap-[3px]">
            <button
              className={`${linkStyle} hover:bg-stone-100 group-hover:bg-stone-100 outline-none`}
            >
              <LuBell className="text-text-color/50 dark:text-[#858585] text-xl  min-w-fit" />
              <p className="line-clamp-1 w-full flex items-center justify-between">
                <span>Notifications</span>
                <span className="px-[5px] opacity-50 text-sm font-medium">
                  99+
                </span>
              </p>
            </button>

            <button
              to={"/"}
              className={`${linkStyle} hover:bg-stone-100 group-hover:bg-stone-100 outline-none`}
            >
              <HiOutlineSpeakerphone className="text-text-color/50 dark:text-[#858585] text-xl  min-w-fit" />
              <p className="line-clamp-1 w-full flex items-center justify-between">
                <span>Updates</span>
                <span className="px-[5px] opacity-50 text-sm font-medium">
                  1
                </span>
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
