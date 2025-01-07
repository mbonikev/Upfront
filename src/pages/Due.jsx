import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/Loader";
import TimeAgo from "react-timeago";
import { format, getHours } from "date-fns";
import { LuLayoutGrid } from "react-icons/lu";
import { TbTimelineEvent } from "react-icons/tb";
import { HiMiniRectangleGroup } from "react-icons/hi2";
import { IoGrid } from "react-icons/io5";
import { HiViewGrid } from "react-icons/hi";
import { RiArrowUpDownLine } from "react-icons/ri";
import { MdViewStream } from "react-icons/md";

function Due() {
  const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_API;
  const { username, userEmail, workspaces, setWorkspaces } = useOutletContext();
  const [myProjects, setMyProjects] = useState([]);
  const [fetchingProjects, setFetchingProjects] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("upfront_user");
    localStorage.removeItem("upfront_user_name");
    localStorage.removeItem("upfront_ws");
    localStorage.removeItem("mycollaborations");
    localStorage.removeItem("collapseWorkspaces");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  // page title
  useEffect(() => {
    const getme = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/getme`, {
          params: { email: userEmail },
        });
        // console.log(response)
      } catch (error) {
        // console.log(error)
        if (error.response.status == 401) {
          handleLogout();
        }
      }
    };
    const getmyProjects = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/getmyrecentprojects`, {
          params: { email: userEmail },
        });
        setMyProjects(response.data.projects);
        setFetchingProjects(false);
      } catch (error) {
        // console.log(error)
        if (error.response.status == 401) {
          // handleLogout();
        }
        setFetchingProjects(false);
      }
    };
    getmyProjects();
    getme();
  }, []);

  const linkStyle = `h-[32px] w-fit text-sm flex items-center gap-[5px] px-2 py-[7px] font-medium text-text-color rounded-lg line-clamp-1 relative select-none`;

  return (
    <div className="w-full dark:bg-dark-body dark:text-light-text-color flex items-start justify-start relative overflow-x-hidden">
      <Toaster
        position="top-center"
        toastOptions={{
          // Define default options
          className: "",
          duration: 2300,
          style: {
            background: "#252525da",
            color: "#d4d4d4",
            fontSize: "14px",
            fontWeight: "500",
            padding: "7px",
            borderRadius: "12px",
            backdropFilter: "blur(5px)",
            border: "1px solid #32323230",
          },
          success: {
            style: {
              padding: "7px 7px 7px 12px",
            },
            iconTheme: {
              primary: "#3b883e",
              secondary: "#fff",
            },
          },
          error: {
            style: {
              padding: "7px 7px 7px 12px",
            },
          },
        }}
      />
      <Sidebar
        username={username}
        userEmail={userEmail}
        workspaces={workspaces}
        setWorkspaces={setWorkspaces}
      />
      <div
        className={`w-[calc(100%-256px)] h-full min-h-svh flex-1 text-text-color bg-white dark:bg-dark-body transition-all duration-500 ease-in-out z-10 overflow-clip flex items-start justify-start flex-col py-6`}
      >
        <div className="w-full flex items-start justify-start flex-col gap-2">
          <h1 className="text-2xl font-extrabold tracking-normal max-w-[500px] break-words dark:text-[#d4d4d4] px-6">
            Dues
          </h1>
          <div className="w-full h-fit my-2 flex items-center justify-between border-b-[2px] border-stone-100 dark:border-[#282828] pb-1 px-6">
            <div className="w-fit flex items-center justify-start gap-1">
              <button
                className={`${linkStyle} text-text-color dark:text-light-text-color bg-stone-100 dark:bg-[#2c2c2c]`}
              >
                <MdViewStream className="text-lg opacity-30" />
                Pipeline View
              </button>
              <button
                className={`${linkStyle} text-text-color dark:text-light-text-color`}
              >
                <HiViewGrid className="text-lg opacity-30" />
                Grid View
              </button>
            </div>
            <div className="w-fit flex items-center justify-start gap-1">
              <button
                className={`${linkStyle} text-text-color dark:text-light-text-color hover:bg-stone-100 dark:hover:bg-[#2c2c2c]`}
              >
                <RiArrowUpDownLine className="text-lg opacity-30" />
                Sort
              </button>
            </div>
          </div>
          {/* main */}
          <div className="w-full h-fit px-6">
            {/* task */}
            <div className="w-full max-w-[1200px] flex items-start justify-start flex-col ring-1 ring-stone-200/60 dark:ring-[#282828] rounded-2xl p-1">
              <div className="w-full h-full min-h-[140px] flex gap-3">
                <div className="w-[140px] bg-stone-100 dark:bg-[#282828] text-text-color/95 rounded-xl p-2 flex">
                  <div className="w-full h-fit bg-white dark:bg-dark-body shadow-lg dark:text-light-text-color rounded-lg flex items-center justify-center flex-col gap-0 p-3 relative">
                    <div className="w-full h-fit absolute top-[-5px] px-3 flex items-center justify-between">
                      <div className="w-[4px] h-[12px] bg-stone-200/90 dark:bg-[#383838] rounded-lg"></div>
                      <div className="w-[4px] h-[12px] bg-stone-200/90 dark:bg-[#383838] rounded-lg"></div>
                    </div>
                    <h1 className="font-semibold">Dec</h1>
                    <h1 className="text-4xl font-semibold tracking-tight">
                      23
                    </h1>
                  </div>
                </div>
                <div className="flex flex-col gap-4 w-full h-full px-1 py-2 text-text-color dark:text-light-text-color">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="w-full flex-1 flex pr-3">
                      <div className="w-full flex min-h-full gap-2 items-start justify-start">
                        {/* line */}
                        <div className="w-[4px] min-w-[4px] h-full rounded-xl bg-stone-200/90 dark:bg-[#282828] flex"></div>
                        {/* task content */}
                        <div className="w-full text-sm font-medium flex items-start justify-between py-1">
                          <h1 className="flex flex-col gap-[3px]">
                            <span>Define Curriculum</span>
                            <span className="opacity-70 font-normal">
                              Default one
                            </span>
                          </h1>
                          <h1 className="text-dark-body/50 dark:text-light-text-color/80 font-normal text-xs flex items-center justify-between gap-1.5">
                            <span className="text-xs opacity-85"></span>
                          </h1>
                          <div className="text-xs opacity-70 dark:opacity-65">
                            2 days ago
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div></div>
            {/* no due */}
            {/* <h1 className="text-dark-body/50 dark:text-light-text-color/80 font-normal max-w-[500px] break-words text-sm">
              You have nothing Due!
            </h1> */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Due;
