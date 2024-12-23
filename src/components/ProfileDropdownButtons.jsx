import React, { useState } from "react";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import {
  LuActivity,
  LuArchive,
  LuAtSign,
  LuInfo,
  LuLogOut,
  LuSettings,
  LuTrash2,
  LuTrophy,
} from "react-icons/lu";
import { RiLoader5Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
function ProfileDropdownButtons({ username, userEmail }) {
  const [logoutAnimate, setLogoutAnimate] = useState(false);
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

  const linkStyle = `h-[32px] w-full flex items-center gap-2 px-2 py-[7px] font-normal dark:text-[#b8b8b8] dark:hover:bg-[#383838] text-text-color/90 tracking-tight rounded-lg line-clamp-1 relative select-none active:bg-stone-100 dark:active:bg-[#404040]`;

  return (
    <div className="w-full flex flex-col justify-start items-start bg-white dark:bg-[#2c2c2c]">
      <div className="p-2 w-full cursor-default">
        <div className="w-full min-h-[34px] flex items-center justify-start gap-2 px-2 py-[3px] text-sm font-normal">
          <p className="h-[35px] w-auto aspect-square rounded-full bg-main-color dark:bg-[#424242] text-white transition flex items-center justify-center text-lg font-bold uppercase">
            {username.charAt(0)}
          </p>
          <div className="w-full h-fit flex flex-col justify-center items-start">
            <p className="line-clamp-1 text-sm tracking-tight  font-medium text-text-color dark:text-[#b8b8b8]">
              {username}
            </p>
            <p className="line-clamp-1 text-text-color/70 text-xs dark:text-[#b8b8b8]/70">
              {userEmail}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-border-line-color/70 dark:bg-[#383838]"></div>
      <div className="p-2 flex flex-col w-full">
        <Link to={"/"} className={`${linkStyle}`}>
          <LuSettings className="text-xl text-text-color/50 dark:text-[#b8b8b8]/50  min-w-fit" />
          <p className="line-clamp-1">Settings</p>
        </Link>
        <Link to={"/"} className={`${linkStyle}`}>
          <LuTrash2 className="text-xl text-text-color/50 dark:text-[#b8b8b8]/50  min-w-fit" />
          <p className="line-clamp-1">Trash</p>
        </Link>
      </div>
      <div className="w-full h-[1px] bg-border-line-color/70 dark:bg-[#383838]"></div>
      <div className="p-2 flex flex-col w-full">
        <Link to={"/"} className={`${linkStyle}`}>
          <LuInfo className="text-xl text-text-color/50 dark:text-[#b8b8b8]/50  min-w-fit" />
          <p className="line-clamp-1">About Upfront</p>
        </Link>
        <Link to={"/"} className={`${linkStyle}`}>
          <HiOutlineSpeakerphone className="text-xl text-text-color/50 dark:text-[#b8b8b8]/50  min-w-fit" />
          <p className="line-clamp-1">Updates</p>
        </Link>
      </div>
      <div className="w-full h-[1px] bg-border-line-color/70 dark:bg-[#383838]"></div>
      <div className="p-2 flex flex-col w-full">
        <button
          onClick={handleLogout}
          className={`${linkStyle}
            logoutAnimate ? "pointer-events-none" : ""
          }`}
        >
          {logoutAnimate ? (
            <>
              <RiLoader5Fill className="text-xl animate-spinLoader text-red-500  min-w-fit" />
              <p className="line-clamp-1">Logging out..</p>
            </>
          ) : (
            <>
              <LuLogOut className="text-xl text-red-500  min-w-fit" />
              <p className="line-clamp-1">Log out</p>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
export default ProfileDropdownButtons;
