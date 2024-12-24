import React, { useEffect, useRef, useState } from "react";
import {
    Link,
    useNavigate,
    useOutletContext,
    useParams,
} from "react-router-dom";
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
    const { workspaceId } = useParams();
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
        getmyProjects();
        fetchAllWorkShops();
        getme();
    }, []);
    
    // getting space names + naming the page
    useEffect(() => {
        const luw1 = localStorage.getItem("upfront_user_name_w1") || "Workspace 1";
        setW1(luw1);
        document.title = luw1 + " - Upfront";
    }, []);
    
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
            ></div>
        </div>
    );
}
export default Projects;
