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

function Sidebar({ handleSidebarToggle, username, userEmail, w1, setW1 }) {
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
  const [originalW1, setOriginalW1] = useState(null);
  const [spaceName, setSpaceName] = useState("");
  const [spaceNumber, setSpaceNumber] = useState("");
  const formRef = useRef(null);
  const [createNew, setCreateNew] = useState(false);
  const [myCollaborations, setMyCollatorations] = useState([]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [AnimateShowSearchModal, setAnimateShowSearchModal] = useState(false);
  // workspace1
  const handleSubmit1 = async (e) => {
    e.preventDefault();
    setAuthing(true);
    try {
      const response = await axios.patch(`${apiUrl}/api/updateWorkspace1`, {
        w1,
        userEmail,
      });
      // console.log('Response data:', response.data);
      localStorage.setItem("upfront_user_name_w1", response.data.workspace1);
      setOriginalW1(response.data.workspace1);
      setMoreOpt1(false);
      setSaveOpt1(false);
      setAuthing(false);
    } catch (err) {
      console.error("Error updating data:", err);
      setAuthing(false);
    }
  };
  const showPMenu = () => {
    setProfileMenu(true);
  };
  const handleLogout = () => {
    localStorage.removeItem("upfront_user");
    localStorage.removeItem("upfront_user_name");
    localStorage.removeItem("upfront_user_name_w1");
    localStorage.removeItem("mycollaborations");
    setLogoutAnimate(true);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  // getting space names
  useEffect(() => {
    const luw1 = localStorage.getItem("upfront_user_name_w1") || "Workspace 1";
    setOriginalW1(luw1);
  }, []);
  const handleCancel = () => {
    setW1(originalW1);
    setMoreOpt1(false);
    setSaveOpt1(false);
  };
  // show more
  const showMoreMenuw1 = () => {
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

  // rename workspace 1
  const renameW1 = () => {
    setMoreOpt1(false);
    setSaveOpt1(true);
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
      console.log(error.response);
    }
  };

  // get collabs
  const retrieveArray = getArray("mycollaborations") ?? [];
  const linkStyle =
    "h-[29px] w-full flex items-center gap-2 px-2 py-[7px] font-normal dark:text-[#b8b8b8] dark:hover:bg-[#2c2c2c] text-text-color/90 tracking-tight rounded-lg line-clamp-1 relative select-none active:bg-stone-100 dark:active:bg-[#323232]";

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
  const handleLinkCopy = () => {};
  // close on esc
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMoreOpt1(false);
        setSaveOpt1(false);
        setProfileMenu(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
            className={`w-fit h-full max-h-[63%] 2xl:max-h-[500px] bg-[#161616ce] dark:bg-[#252525da] backdrop-blur-[20px] rounded-[25px] fixed top-0 left-0 right-0 bottom-0 m-auto shadow-custom ring-1 ring-border-line-color/0 z-30 transition-all duration-150 
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
        {/* dropdown */}
        {profileMenu && (
          <div className="w-[290px] h-fit max-h-[80vh] absolute top-[52px] left-3 rounded-xl shadow-custom ring-1 ring-border-line-color/0 overflow-y-auto z-30">
            <ProfileDropdownButtons username={username} userEmail={userEmail} />
          </div>
        )}
        <div className="w-full h-full border-r-[2px] border-stone-200/70 dark:border-[#313131a6] bg-white dark:bg-[#202020] dark:text-[#b8b8b8] flex flex-col gap-[2px] p-2 text-sm min-h-svh max-h-svh overflow-y-auto overscroll-contain">
          {/* 1 */}
          <div className="w-full h-fit mb-4">
            <button
              onClick={showPMenu}
              className="dark:text-[#b8b8b8] text-text-color w-full flex items-center justify-start gap-[2px] hover:bg-stone-100 dark:hover:bg-[#2c2c2c] transition px-1.5 py-1.5 rounded-lg"
            >
              <p className="h-[25px] w-auto aspect-square rounded-full bg-main-color dark:bg-[#424242] text-white transition flex items-center justify-center text-sm font-semibold uppercase">
                {username.charAt(0)}
              </p>
              <p className="truncate flex-1 text-left font-medium text-sm tracking-tight pl-[6px]">
                {username}
              </p>
              <LuChevronsUpDown className="text-base mx-[5px] " />
            </button>
          </div>
          {/* 2 */}
          <div className="flex-1 flex flex-col gap-[3px]">
            <button
              onClick={handleCreate}
              className={`min-h-[34px] flex items-center gap-2 px-[5px] py-[5px] font-medium text-main-color dark:text-stone-300 tracking-tight rounded-md hover:bg-stone-100 dark:hover:bg-[#2c2c2c] ${
                createNew && "pointer-events-none select-none"
              }`}
            >
              {createNew ? (
                <div className="flex items-center gap-2">
                  <RiLoader5Fill className="text-2xl animate-spinLoader" />
                  <p className="line-clamp-1 ">Setting up your project... </p>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <IoIosAddCircle className="text-2xl" />
                  <p className="line-clamp-1 ">New Project</p>
                </div>
              )}
            </button>
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
                <div className="w-fit h-fit text-text-color/50 dark:text-[#858585] text-[15px] font-semibold leading-none z-10 tracking-wide">
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
            <p className="flex items-center justify-start gap-2 mt-[6px] rounded-lg py-[7px] pr-[16px] pl-[8px] font-medium dark:text-[#b8b8b8]/70 text-text-color/70 tracking-tight select-none  w-fit">
              <LuChevronDown className="p-[2px] cursor-pointer hover:bg-stone-100 dark:hover:bg-[#2c2c2c] dark:active:brightness-125 rounded-md h-[20px] w-auto aspect-square" />
              <span>Workspaces</span>
            </p>
            {/* Workspace 1 */}
            <form onSubmit={handleSubmit1} className="relative group mb-10 ">
              <Link
                to={"/"}
                className={`${linkStyle} ${
                  location.pathname === "/"
                    ? "bg-stone-200/50 dark:bg-[#2c2c2c]"
                    : "hover:bg-stone-100 group-hover:bg-stone-100"
                }`}
              >
                <IoFolderOpen className="text-xl text-text-color/50 dark:text-[#858585]" />
                <p className="line-clamp-1 max-w-[70%]">{w1}</p>
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
                      name="workspace1"
                      autoComplete="off"
                      value={w1}
                      onChange={(e) => setW1(e.target.value)}
                      className=" h-full w-full bg-white dark:text-[#f1f1f1] dark:bg-[#2c2c2c] text-text-color ring-2 ring-main-color/50 rounded-md px-2 overflow-hidden"
                    />
                  </div>
                </>
              )}
              <div
                ref={moreButtonRef}
                onClick={showMoreMenuw1}
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
                      onClick={handleLinkCopy}
                      className={`${linkStyle} hover:bg-stone-100 dark:hover:bg-[#383838]`}
                    >
                      <LuLink className="text-base min-w-fit" />
                      <p className="line-clamp-1">Copy link</p>
                    </button>
                    <button
                      onClick={renameW1}
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
