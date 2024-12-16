import React, { useEffect, useRef, useState } from "react";
import { IoIosAddCircle, IoMdNotificationsOutline } from "react-icons/io";
import { IoChevronDown, IoFolderOpen } from "react-icons/io5";
import {
  LuActivity,
  LuBadgeX,
  LuCheck,
  LuCheckCircle,
  LuCog,
  LuCrown,
  LuFlag,
  LuFlagTriangleRight,
  LuHash,
  LuInfo,
  LuLogOut,
  LuMinus,
  LuMoreHorizontal,
  LuPen,
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
import Achievements from "./Archievements";
function Sidebar({ handleSidebarToggle, username, userEmail, w1, setW1 }) {
  const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_API;
  const [profileMenu, setProfileMenu] = useState(false);
  const [logoutAnimate, setLogoutAnimate] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);
  const [moreOpt1, setMoreOpt1] = useState(false);
  const [saveOpt1, setSaveOpt1] = useState(false);
  const [saveOpt3, setSaveOpt3] = useState(false);
  const [originalW1, setOriginalW1] = useState(null);
  const [spaceName, setSpaceName] = useState("");
  const [spaceNumber, setSpaceNumber] = useState("");
  const formRef = useRef(null);
  const [createNew, setCreateNew] = useState(false);
  const [myCollaborations, setMyCollatorations] = useState([]);
  const [achievments, setAchievments] = useState(false);
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
    setMoreOpt1(true);
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
    "min-h-[34px] w-full flex items-center gap-2 px-2 py-[7px] font-normal dark:text-[#b8b8b8] dark:hover:bg-[#2c2c2c] text-text-color/90 tracking-tight rounded-lg line-clamp-1 relative";

  const getDate = new Date();
  const Today = getDate.getDate();
  return (
    <div className="w-[256px] min-w-[256px] sticky top-0 z-20">
      <div className=" relative w-full h-full">
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
        {/* Achievements overlay */}
        <div
          onClick={() => setAchievments(true)}
          className={` top-0 left-0 w-full h-full z-20 bg-black/50 ${
            achievments ? "fixed" : "hidden"
          }`}
        ></div>
        {/* achiements component */}
        {achievments && (
          <div className="w-fit h-fit bg-white rounded-xl fixed top-0 left-0 right-0 bottom-0 m-auto shadow-custom ring-1 ring-border-line-color/0 z-30">
            <Achievements
              username={username}
              handleClose={() => setAchievments(true)}
            />
          </div>
        )}

        {/* dropdown */}
        {profileMenu && (
          <div className="w-[290px] h-fit max-h-[80vh] absolute top-[52px] left-3 rounded-xl shadow-custom ring-1 ring-border-line-color/0 overflow-y-auto z-30">
            <ProfileDropdownButtons username={username} />
          </div>
        )}
        <div className="w-full h-fit min-h-svh max-h-svh border-r-[1px] border-border-line-color/20 dark:border-[#313131a6] bg-sidebar-color dark:bg-[#202020] dark:text-[#b8b8b8] flex flex-col gap-[2px] p-3 text-sm overflow-y-auto">
          <div className="w-full flex items-center justify-between mb-4">
            <button
              onClick={showPMenu}
              className="dark:text-[#b8b8b8] text-text-color max-w-[150px] flex items-center justify-start gap-[2px] hover:bg-stone-200 dark:hover:bg-[#2c2c2c] transition p-1 rounded-lg"
            >
              <p className="h-[26px] w-auto aspect-square rounded-full bg-main-color hover:bg-main-color-hover transition flex items-center justify-center text-base font-semibold text-white uppercase">
                {username.charAt(0)}
              </p>
              <p className="truncate font-medium text-sm tracking-tight pl-[6px]">
                {username}
              </p>
              <IoChevronDown className="min-w-[15px] " />
            </button>
            <div className="flex items-center justify-end gap-0">
              <button
                title="Notifications"
                className=" h-[33px] dark:text-[#f1f1f1]/70 text-text-color/70 w-auto aspect-square flex items-center justify-center rounded-full transition hover:bg-stone-200 dark:hover:bg-[#2c2c2c] text-text-color"
              >
                <IoMdNotificationsOutline className="text-[22px]" />
              </button>
            </div>
          </div>
          <button
            onClick={handleCreate}
            className={`min-h-[34px] flex items-center gap-2 px-[5px] py-[5px] font-medium text-main-color dark:text-stone-300 tracking-tight rounded-md hover:bg-stone-200/50 dark:hover:bg-[#2c2c2c] ${
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
          <Link
            to={"/d"}
            className={`${linkStyle} hover:bg-stone-200/50 group-hover:bg-stone-200/50`}
          >
            <LuSearch className="text-text-color/50 dark:text-[#858585] text-xl  min-w-fit" />
            <p className="line-clamp-1">Search</p>
          </Link>
          <Link
            to={"/"}
            className={`${linkStyle} hover:bg-stone-200/50 group-hover:bg-stone-200/50`}
          >
            <RiUserSharedLine className="text-text-color/50 dark:text-[#858585] text-xl  min-w-fit" />
            <p className="line-clamp-1">Shared with me</p>
          </Link>
          <p className="flex items-center justify-between gap-2 pt-[13px] pb-[7px] px-[10px] font-medium dark:text-[#f1f1f1]/70 text-text-color/70 tracking-tight">
            Calendar
          </p>
          <Link
            to={"/"}
            className={`${linkStyle} hover:bg-stone-200/50 group-hover:bg-stone-200/50`}
          >
            <LuTimerReset className="text-text-color/50 dark:text-[#858585] text-xl  min-w-fit" />
            <p className="line-clamp-1">Dues</p>
          </Link>
          <Link
            to={"/"}
            className={`${linkStyle} hover:bg-stone-200/50 group-hover:bg-stone-200/50`}
          >
            <div className="text-text-color/50 dark:text-[#858585] text-xl bg-red-200/0 w-[20px] min-w-[20px] h-[20px] relative pt-[0px] flex flex-col items-center justify-center gap-[2px]">
              <LuMinus className="text-text-color/50 dark:text-[#858585] text-[15px] w-full h-[2px] bg-red-500 leading-none" />
              <div className="w-fit h-fit text-text-color/50 dark:text-[#858585] text-[15px] font-semibold leading-none z-10 tracking-wide">
                {Today}
              </div>
            </div>
            <p className="line-clamp-1">Today</p>
          </Link>
          <Link
            to={"/"}
            className={`${linkStyle} hover:bg-stone-200/50 group-hover:bg-stone-200/50`}
          >
            <LuCheckCircle className="text-text-color/50 dark:text-[#858585] text-lg px-[1px] min-w-fit" />
            <p className="line-clamp-1">Completed </p>
          </Link>
          {/* <Link to={'/'} className={`${linkStyle} hover:bg-stone-200/50 group-hover:bg-stone-200/50`}>
                        <LuTrash2 className='text-lg px-[1px] min-w-fit' />
                        <p className='line-clamp-1'>Trash </p>
                    </Link> */}
          <p className="flex items-center justify-between gap-2 pt-[13px] pb-[7px] px-[10px] font-medium dark:text-[#f1f1f1]/70 text-text-color/70 tracking-tight">
            <span>Workspaces</span>
            <Link to={"/"} title="Add Worksspace">
              <LuPlus className="text-lg cursor-pointer text-text-color dark:text-[#b8b8b8] hover:text-white" />
            </Link>
          </p>
          {/* Workspace 1 */}
          <form onSubmit={handleSubmit1} className="relative group mb-10 ">
            <Link
              to={"/"}
              className={`${linkStyle} ${
                location.pathname === "/"
                  ? "bg-main-color/10 dark:bg-[#2c2c2c]"
                  : "hover:bg-stone-200/50 group-hover:bg-stone-200/50"
              }`}
            >
              <IoFolderOpen className="text-xl text-text-color/50 dark:text-[#858585]" />
              <p className="line-clamp-1">{w1}</p>
            </Link>
            {saveOpt1 && (
              <>
                <div className="w-[100%] h-[100%] absolute top-0 left-0 z-30 bg-white dark:bg-[#202020] flex items-center justify-center p-1">
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
              onClick={showMoreMenuw1}
              className={` cursor-pointer absolute right-1 bottom-0 top-0 my-auto h-fit w-fit flex items-center justify-center opacity-0 group-hover:opacity-100 dark:bg-[#2c2c2c] px-2 ${
                moreOpt1 && "opacity-100"
              }`}
            >
              <LuMoreHorizontal className="text-xl dark:text-[#f1f1f1]/70 text-text-color/70 dark:hover:text-white text-text-color" />
            </div>
            {moreOpt1 && (
              <>
                <div className="absolute right-0 top-[110%] bg-white dark:bg-[#2c2c2c] dark:shadow-custom2 rounded-xl w-fit min-w-[75%] max-w-[170px] h-fit shadow-md z-20 ring-1 ring-border-line-color/50 dark:ring-stone-600/30 p-1">
                  <div
                    onClick={renameW1}
                    className={`${linkStyle} cursor-pointer hover:bg-stone-200/50 dark:hover:bg-[#383838]`}
                  >
                    <LuPencilLine className="text-lg  min-w-fit" />
                    <p className="line-clamp-1">Rename</p>
                  </div>
                  <Link
                    to={"/"}
                    className={`${linkStyle} cursor-pointer hover:bg-stone-200/50 dark:hover:bg-[#383838]`}
                  >
                    <LuTrash2 className="text-lg  min-w-fit text-red-500" />
                    <p className="line-clamp-1 text-red-500">Clear</p>
                  </Link>
                </div>
              </>
            )}
            {saveOpt1 && (
              <>
                <div className="absolute right-0 top-[110%] bg-white dark:bg-[#2c2c2c] dark:shadow-custom2 rounded-xl w-fit min-w-[75%] max-w-[170px] h-fit shadow-md z-20 ring-1 ring-border-line-color/50 dark:ring-stone-600/30 p-1">
                  <button
                    type="submit"
                    className={`${linkStyle} cursor-pointer hover:bg-stone-200/50 dark:hover:bg-[#383838]`}
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
                    className={`${linkStyle} cursor-pointer hover:bg-stone-200/50 dark:hover:bg-[#383838]`}
                  >
                    <LuX className="text-lg  min-w-fit text-red-500" />
                    <p className="line-clamp-1 text-red-500">Cancel</p>
                  </div>
                </div>
              </>
            )}
          </form>
          {/* <Link
                        to={"/"}
                        className={`${linkStyle} hover:bg-stone-200/50 group-hover:bg-stone-200/50 flex justify-start`}
                    >
                        <LuCrown className="text-xl text-text-color/50 dark:text-[#858585]" />
                        <h1 className="flex flex-col">
                            <span>Unlock More Workspaces</span>
                            <span className="text-[11px] dark:text-[#f1f1f1]/70 text-text-color/70 font-medium ">
                                $5.99 / Month - $49.99 / Year
                            </span>
                        </h1>
                    </Link> */}
          <p className="flex items-center gap-2 pt-[13px] pb-[7px] pl-[10px] font-medium dark:text-[#f1f1f1]/70 text-text-color/70 tracking-tight w-full justify-between">
            <span>Collaborations</span>
            <span>
              <span className="line-clamp-1 text-xs py-1 px-2 cursor-pointer font-medium dark:text-[#f1f1f1]/70 text-text-color/70 w-full text-center hover:bg-stone-200/50 dark:hover:bg-[#2c2c2c] rounded-lg ">
                View all
              </span>
            </span>
          </p>
          {retrieveArray.slice(0, 3).map((collab, index) => (
            <Link
              key={index}
              to={"/"}
              className="min-h-[34px] flex items-center gap-2 px-2 py-[7px] dark:text-[#b8b8b8] text-text-color/90 tracking-tight rounded-md hover:bg-stone-200/50 dark:hover:bg-[#2c2c2c] line-clamp-1 "
            >
              <LuWorkflow className="text-xl text-main-color min-w-fit" />
              <div className="flex flex-col justify-start items-start">
                <p className="line-clamp-1 font-medium">
                  {collab.name === "" ? "Untitled" : collab.name}
                </p>
                <p className="line-clamp-1 text-xs font-normal dark:text-[#f1f1f1]/70 text-text-color/70">
                  {collab.user_email} added you
                </p>
              </div>
            </Link>
          ))}
          {retrieveArray.length === 0 && (
            <p className="line-clamp-1 text-xs px-9 font-normal dark:text-[#f1f1f1]/70 text-text-color/70">
              No contributions yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
