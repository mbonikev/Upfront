import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/Loader";
import TimeAgo from "react-timeago";
import { format, getHours } from "date-fns";

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
        className={`w-[calc(100%-256px)] h-full min-h-svh flex-1 text-text-color bg-white dark:bg-dark-body transition-all duration-500 ease-in-out z-10 overflow-clip flex items-start justify-start flex-col p-6`}
      >
        <div className="flex items-start justify-start flex-col gap-2">
          <h1 className="text-2xl font-extrabold tracking-normal max-w-[500px] break-words dark:text-[#d4d4d4]">
            Dues
          </h1>
          <div className="w-full h-fit flex items-center justify-between">
            <div className="w-fit flex items-center justify-start gap-1">
                
            </div>
            <div className="w-fit flex items-center justify-start gap-1"></div>
          </div>
          {/* no due */}
          <h1 className="text-dark-body/50 dark:text-light-text-color/80 font-normal max-w-[500px] break-words text-sm">
            You have nothing Due!
          </h1>
        </div>
      </div>
    </div>
  );
}
export default Due;
