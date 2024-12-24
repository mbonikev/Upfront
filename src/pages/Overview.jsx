import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { TbStack } from "react-icons/tb";
import BreadCrumb from "../components/BreadCrumb";
import Sidebar from "../components/Sidebar";
import { LuArchive, LuHash, LuShare2, LuTrash2 } from "react-icons/lu";
import axios from "axios";
import { format } from "date-fns";
import { RiLoader5Fill } from "react-icons/ri";
import { setArray } from "../utils/hashUtils";
import AddNotes from "../components/AddNotes";
import { IoIosAddCircle } from "react-icons/io";
import { IoFolderOpen } from "react-icons/io5";
import { FaPlusCircle } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

function Projects() {
  const { workspaceId } = useParams()
  const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_API;
  const { username, userEmail } = useOutletContext();
  const [pageTitle, setPageTitle] = useState("Workspace 1");
  const inputRef = useRef(null);
  // spaces
  const [w1, setW1] = useState(null);
  const [myProjects, setMyProjects] = useState([]);
  const [projectBoards, setProjectBoards] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [fetchingProjects, setFetchingProjects] = useState(true);
  const dummyProjectNumber = ["", "", ""];
  const [myCollaborations, setMyCollatorations] = useState([]);
  const navigate = useNavigate();
  const [createNew, setCreateNew] = useState(false);
  const [deleteMenu, setDeleteMenu] = useState("");
  const [deleting, setDeleting] = useState("");
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
      const width = tempSpan.offsetWidth + 10; // Add extra padding
      document.body.removeChild(tempSpan);
      input.style.width = `${width}px`;
    }
  }, [pageTitle]);

  const getProgressClasses = (progress) => {
    let classes =
      "flex flex-col justify-center rounded-full overflow-hidden text-xs text-white text-center whitespace-nowrap transition duration-500";
    if (progress <= 100 && progress > 75) {
      classes += " bg-lime-600 dark:bg-lime-600/50"; // Green for complete progress
    } else if (progress < 75 && progress > 50) {
      classes += " bg-teal-500 dark:bg-teal-500/50"; // Teal for progress between 76 and 99
    } else if (progress < 50 && progress > 25) {
      classes += " bg-blue-400 dark:bg-blue-400/50"; // Blue for progress between 51 and 75
    } else if (progress < 50) {
      classes += " bg-red-400 dark:bg-red-400/50"; // Cyan for progress between 26 and 50
    }
    return classes;
  };
  const handleLogout = () => {
    localStorage.removeItem("upfront_user");
    localStorage.removeItem("upfront_user_name");
    localStorage.removeItem("upfront_user_name_w1");
    localStorage.removeItem("mycollaborations");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  // page title
  useEffect(() => {
    const fetchAllWorkShops = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/workspaces`, {
          params: { userEmail },
        });
        // console.log('Response data:', response);
        localStorage.setItem("upfront_user_name_w1", response.data.dbw1);
      } catch (err) {
        console.error("Error updating data:", err);
      }
    };
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
        const response = await axios.get(`${apiUrl}/api/getmyprojects`, {
          params: { email: userEmail },
        });
        setMyProjects(response.data.projects);
        setFetchingProjects(false);
      } catch (error) {
        // console.log(error)
        if (error.response.status == 401) {
          handleLogout();
        }
      }
    };
    const getmyBoards = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/getnumberofboards`, {
          params: { email: userEmail },
        });
        setProjectBoards(response.data);
      } catch (error) {
        if (error.response.status == 401) {
          console.log("no project yet");
        }
      }
    };
    const getmyTasks = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/getalltasks`, {
          params: { email: userEmail },
        });
        setAllTasks(response.data);
      } catch (error) {
        if (error.response.status == 401) {
          console.log("no project yet");
        }
      }
    };
    const getCollaborations = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/getcollaborations`, {
          params: { email: userEmail },
        });
        setMyCollatorations(response.data.projects);
        setArray("mycollaborations", response.data.projects);
        // const isArrayValid = verifyHashedArray('mycollaborations', JSON.stringify(response.data.projects));
      } catch (error) {
        console.log(error);
      }
    };
    getCollaborations();
    getmyProjects();
    getmyBoards();
    getmyTasks();
    fetchAllWorkShops();
    getme();
  }, []);
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
  // getting space names + naming the page
  useEffect(() => {
    const luw1 = localStorage.getItem("upfront_user_name_w1") || "Workspace 1";
    setW1(luw1);
    document.title = luw1 + " - Upfront";
  }, []);
  const handleTrashProject = async (id, name) => {
    setDeleting(id);
    try {
      const response = await axios.post(`${apiUrl}/api/movetotrash`, {
        projectId: id,
        userEmail,
      });
      // window.location.reload()
      setMyProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== id)
      );
      setDeleting("");
      toast.success(
        <>
          "<span className="max-w-[70px] truncate">{name === "" ? "Untitled" : name}</span>" Moved to trash
        </>
      );
    } catch (err) {
      console.log(err);
      setDeleting("");
      toast.error("Delete Failed!");
    }
  };
  return (
    <div className="w-full dark:bg-dark-body dark:text-[#b8b8b8] flex items-start justify-start relative">
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
        className={`w-full h-full min-h-svh flex-1 text-text-color flex flex-col bg-stone-50 dark:bg-dark-body transition-all duration-500 ease-in-out z-10 `}
      >
        
      </div>
    </div>
  );
}
export default Projects;
