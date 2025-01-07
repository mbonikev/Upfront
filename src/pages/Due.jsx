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
import { LuChevronLeft, LuChevronRight, LuHash } from "react-icons/lu";
import Loader from "../components/Loader";
import TimeAgo from "react-timeago";
import { format, getHours } from "date-fns";

function Projects() {
  const { workspaceId } = useParams();
  const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_API;
  const { username, userEmail, workspaces, setWorkspaces } = useOutletContext();
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

  const hour = getHours(new Date());
  const getGreeting = () => {
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

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
        className={`w-[calc(100%-256px)] h-full min-h-svh flex-1 text-text-color bg-white dark:bg-dark-body transition-all duration-500 ease-in-out z-10 overflow-clip flex items-start justify-start flex-col px-10`}
      >
        
      </div>
    </div>
  );
}
export default Projects;
