import React, { useEffect, useRef, useState } from "react";
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

function Projects() {
  const { workspaceId } = useParams();
  const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_API;
  const { username, userEmail } = useOutletContext();
  const [pageTitle, setPageTitle] = useState("Workspace 1");
  const inputRef = useRef(null);
  // spaces
  const [w1, setW1] = useState(null);
  //   const [myWorkSpaces, setMyWorkSpaces] = useState([]);
  const [myProjects, setMyProjects] = useState([]);
  const [fetchingProjects, setFetchingProjects] = useState(true);
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("upfront_user");
    localStorage.removeItem("upfront_user_name");
    localStorage.removeItem("upfront_ws");
    localStorage.removeItem("mycollaborations");
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
      }
    };
    getmyProjects();
    getme();
  }, []);

  const handleScroll = () => {
    const content = contentRef.current;
    if (content) {
      setCanScrollLeft(content.scrollLeft > 0);

      // Adjust the calculation to ensure precision
      const isAtEnd =
        Math.ceil(content.scrollLeft + content.clientWidth) >=
        content.scrollWidth;

      setCanScrollRight(!isAtEnd);
    }
  };

  const scrollLeft = () => {
    contentRef.current?.scrollBy({
      left: -200, // Adjust scroll distance as needed
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    contentRef.current?.scrollBy({
      left: 200, // Adjust scroll distance as needed
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Initial check for scrollable buttons
    handleScroll();
  }, []);

  return (
    <div className="w-full dark:bg-dark-body dark:text-[#b8b8b8] flex items-start justify-start relative overflow-x-hidden">
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
        w1={w1}
        setW1={setW1}
      />
      <div
        className={`w-[calc(100%-256px)] h-full min-h-svh flex-1 text-text-color bg-stone-50 dark:bg-dark-body transition-all duration-500 ease-in-out z-10 overflow-clip flex items-start justify-start flex-col p-1`}
      >
        {/* greating */}
        <div className="w-full h-fit mt-16 flex items-center justify-center">
          <h1 className="text-text-color dark:text-[#b8b8b8] text-3xl font-semibold tracking-tight">
            Good Morning, Kevin
          </h1>
        </div>
        {myProjects.length > 0 ? (
          <>
            {/* recent visited projects */}
            <h1 className="text-dark-body/50 dark:text-[#b8b8b8]/80 font-normal w-full max-w-[900px] mx-auto px-5 mt-10 text-sm">
              Recently visited
            </h1>
            <div className="relative w-full bg-stone-50 dark:bg-dark-body min-h-[50px] max-w-[900px] mt-2 mx-auto px-7 max-xl:px-0 flex items-start justify-start flex-col overflow-x-auto hidden_scrollbar">
              {/* Left Button */}
              {canScrollLeft && (
                <div className="nextSpace w-[80px] h-full absolute top-0 left-5 max-xl:left-0 bg-gradient-to-r max-xl:pl-2 from-stone-50 dark:from-dark-body via-stone-50 dark:via-dark-body to-transparent z-20 flex items-center justify-start">
                  <button
                    onClick={scrollLeft}
                    className="h-[30px] w-auto aspect-square ring-1 ring-stone-200 hover:ring-stone-400 bg-white dark:bg-[#2c2c2c] dark:text-[#727272] dark:hover:text-[#b8b8b8] dark:ring-transparent dark:hover:ring-transparent flex items-center justify-center rounded-full"
                  >
                    <LuChevronLeft className="text-xl" />
                  </button>
                </div>
              )}
              {/* Right Button */}
              {canScrollRight && (
                <div className="prevSpace w-[80px] h-full absolute top-0 right-5 max-xl:right-0 bg-gradient-to-l max-xl:pr-2 from-stone-50 dark:from-dark-body via-stone-50 dark:via-dark-body to-transparent z-20 flex items-center justify-end">
                  <button
                    onClick={scrollRight}
                    className="h-[30px] w-auto aspect-square ring-1 ring-stone-200 hover:ring-stone-400 bg-white
                .
                 dark:bg-[#2c2c2c] dark:text-[#727272] dark:hover:text-[#b8b8b8] dark:ring-transparent dark:hover:ring-transparent flex items-center justify-center rounded-full"
                  >
                    <LuChevronRight className="text-xl" />
                  </button>
                </div>
              )}
              {/* content */}
              <div
                ref={contentRef}
                onScroll={handleScroll}
                className={`w-full flex-1 h-fit bg-stone-50 dark:bg-dark-body flex items-center justify-start overflow-auto hidden_scrollbar gap-3 py-2 px-1`}
              >
                {myProjects.map((project, index) => (
                  <Link to={`/project/${project.workspace_name}/${project._id}`} key={index} className="w-[150px] min-w-[150px] h-[140px] rounded-xl bg-white dark:bg-[#202020] text-dark-body dark:text-[#b8b8b8] ring-1 ring-stone-200/70 dark:ring-dark-body transition active:scale-95 overflow-hidden hover:ring-2 hover:ring-main-color/50">
                    {/* banner */}
                    <div className="w-full h-[50px] bg-stone-200 dark:bg-[#282828] relative">
                    </div>
                    <div className="h-[40px] w-[40px] min-w-[40px] rounded-full aspect-square"></div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-dark-body/50 dark:text-[#b8b8b8]/80 font-normal w-full max-w-[900px] mx-auto px-5 mt-10 text-sm">
              You have no recent activity!
            </h1>
          </>
        )}
      </div>
    </div>
  );
}
export default Projects;
