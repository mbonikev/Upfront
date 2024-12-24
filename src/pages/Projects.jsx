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
  const [pageTitle, setPageTitle] = useState("");
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
    localStorage.removeItem("upfront_ws");
    localStorage.removeItem("mycollaborations");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  // page title
  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/getthisworkspace`, {
          params: { userEmail, workspaceId },
        });
        console.log("Response status:", response);
      } catch (error) {
        if (error.response.status === 400 || error.response.status === 401) {
          // navigate("/");
        }
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
          params: { email: userEmail, workspaceId },
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
          // console.log("no project yet");
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
          // console.log("no project yet");
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
    fetchWorkspace();
    getme();
  }, []);
  // getting space names
  useEffect(() => {
    const workspaces = JSON.parse(localStorage.getItem("upfront_ws")) || [];
    if (workspaces.length > 0) {
      setPageTitle(
        workspaces.find((space) => space._id === workspaceId).workspace_name ||
          ""
      );
    } else {
      setPageTitle("Workspace 1");
    }
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
          "
          <span className="max-w-[70px] truncate">
            {name === "" ? "Untitled" : name}
          </span>
          " Moved to trash
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
        pageTitle={pageTitle}
        setPageTitle={setPageTitle}
      />
      <div
        className={`w-full h-full min-h-svh flex-1 text-text-color flex flex-col bg-stone-50 dark:bg-dark-body transition-all duration-500 ease-in-out z-10 `}
      >
        <div className="w-full h-fit flex items-start justify-between px-5 pt-3">
          <div className=" min-h-[35px] flex items-center justify-start gap-0 ">
            <div className="flex items-center justify-start gap-[2px] text-sm text-text-color/70 dark:text-[#b8b8b8]">
              <BreadCrumb name={"Workspaces"} status={"off"} link={"/"} /> /
              <BreadCrumb name={w1} status={"on"} link={"/"} />
            </div>
          </div>
          <div className="flex items-center justify-end gap-0">
            <button
              title="Trash"
              className="hover:bg-stone-100 transition text-xs font-semibold py-2 px-3 gap-1 text-text-color/70 dark:text-[#b8b8b8]/70 hover:text-text-color dark:hover:text-[#b8b8b8] dark:hover:bg-[#2c2c2c] rounded-lg inline-flex items-center"
            >
              <LuTrash2 className="text-lg" />
              <span className="text-sm font-medium tracking-tight">Trash</span>
            </button>
            {/* <button title='create a new project' className="bg-gradient-to-tr from-main-color/60 to-main-color-hover hover:bg-main-color-hover transition text-white text-xs font-semibold py-2 px-4 gap-1 rounded-lg inline-flex items-center">
              <FaPlus />
              <span className='text-xs font-medium'>New project</span>
            </button> */}
            {/* <button title='Deadlines' className='text-xl h-[35px] w-auto aspect-square flex items-center justify-center rounded-full transition bg-stone-100 hover:bg-stone-200'>
              <RxTimer />
            </button> */}
            {/* <button title='Notifications' className='text-xl h-[35px] w-auto aspect-square flex items-center justify-center rounded-full transition bg-stone-100 hover:bg-stone-200'>
              <IoMdNotificationsOutline />
            </button> */}
            {/* <button title={username} className='h-[35px] w-auto aspect-square rounded-full bg-main-color hover:bg-main-color-hover transition flex items-center justify-center text-lg font-semibold text-white'>{username.charAt(0)}</button> */}
          </div>
        </div>
        <div className="w-full h-fit flex items-start justify-between px-5 py-5 max-w-[2000px]">
          {fetchingProjects ? (
            <>
              <div className="group z-10 relative w-32 h-[50px] rounded-2xl dark:bg-[#313131] bg-stone-200"></div>
            </>
          ) : (
            <>
              <div className="flex items-start justify-start gap-2 ">
                <IoFolderOpen className="text-3xl mt-[3px] text-text-color/50 dark:text-[#858585]" />
                <h1 className="text-3xl font-extrabold tracking-normal max-w-[500px] break-words dark:text-[#d4d4d4]">
                  {pageTitle}
                  {/* <span className=" self-end text-xs font-medium bg-teal-600/10 dark:text-[#b8b8b8] dark:bg-[#2c2c2c] mb-[4px] ml-2 py-[3px] px-2 tracking-tight rounded-md">
                Free
              </span> */}
                </h1>
              </div>
            </>
          )}
        </div>
        {/* Projects section */}
        <div className="w-full h-full flex-1 px-6 pb-10 max-w-[2000px] flex flex-col">
          <div className="w-full h-fit flex items-end justify-between">
            {fetchingProjects ? (
              <>
                <div className="group z-10 relative w-4/6 h-[10px] rounded-2xl dark:bg-[#313131] bg-stone-200"></div>
              </>
            ) : (
              <>
                <p className="font-normal text-[13px] text-text-color/70 dark:text-[#b8b8b8]">
                  <span className="text-text-color dark:text-[#b8b8b8] font-medium">
                    {myProjects.length}
                  </span>{" "}
                  in Progress |{" "}
                  <span className="text-text-color dark:text-[#b8b8b8] font-medium">
                    0
                  </span>{" "}
                  Completed
                </p>
              </>
            )}
          </div>
          {/* <span className='w-full h-[1px] bg-border-line-color/50 flex mt-2 '></span> */}
          {fetchingProjects ? (
            <>
              <div className="grid grid-cols-3 2xl:grid-cols-5 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-3 pt-4 relative">
                {[...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="group z-10 relative w-full h-fit rounded-2xl animate-smooth-pulse bg-stone-100 dark:bg-[#242424] flex flex-col gap-4 p-4"
                  >
                    <div className="group z-10 relative w-full h-[15px] rounded-2xl dark:bg-[#313131] bg-stone-200"></div>
                    <div className="group z-10 relative w-1/3 h-[10px] rounded-2xl dark:bg-[#313131] bg-stone-200"></div>
                    <div className="flex items-center">
                      <div className="group z-10 relative w-auto h-8 aspect-square rounded-2xl dark:bg-[#313131] bg-stone-200 ring-4 ring-stone-100 dark:ring-[#242424]"></div>
                      <div className="group z-10 relative w-auto h-8 aspect-square rounded-2xl dark:bg-[#313131] bg-stone-200 ring-4 ring-stone-100 dark:ring-[#242424] ml-[-5px]"></div>
                      <div className="group z-10 relative w-auto h-8 aspect-square rounded-2xl dark:bg-[#313131] bg-stone-200 ring-4 ring-stone-100 dark:ring-[#242424] ml-[-5px]"></div>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="group z-10 relative w-1/6 h-[10px] rounded-2xl dark:bg-[#313131] bg-stone-200"></div>
                      <div className="group z-10 relative w-4/6 h-[10px] rounded-2xl dark:bg-[#313131] bg-stone-200"></div>
                      <div className="group z-10 relative w-1/6 h-[10px] rounded-2xl dark:bg-[#313131] bg-stone-200"></div>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="group z-10 relative w-[20px] h-[10px] rounded-2xl dark:bg-[#313131] bg-stone-200"></div>
                      <div className="group z-10 relative w-[20px] h-[10px] rounded-2xl dark:bg-[#313131] bg-stone-200"></div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {myProjects.length < 1 ? (
                <div className="w-full h-full flex-1 bg-transparent flex items-center justify-center flex-col p-5 pb-20 max-md:pb-5">
                  {/* <RiLoader5Fill className="text-3xl text-text-color/70 animate-spinLoader mb-10" /> */}
                  <div className="w-[160px] aspect-square flex items-center justify-center p-2">
                    <AddNotes width={"w-[130px]"} />
                  </div>
                  <p className="font-normal text-sm text-text-color/70 dark:text-[#b8b8b8]/70">
                    Let's create your first project
                  </p>
                  <button
                    onClick={handleCreate}
                    className={`min-h-[34px] flex mt-2 items-center gap-2 px-3 py-[5px] font-medium text-main-color dark:text-[#b8b8b8] tracking-tight rounded-md hover:bg-stone-200/50 dark:hover:bg-[#2c2c2c] ${
                      createNew && "pointer-events-none select-none"
                    }`}
                  >
                    {createNew ? (
                      <div className="flex items-center gap-1">
                        <RiLoader5Fill className="text-2xl animate-spinLoader" />
                        <p className="line-clamp-1">
                          Setting up your project...{" "}
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <IoIosAddCircle className="text-2xl" />
                        <p className="line-clamp-1">New Project</p>
                      </div>
                    )}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-3 2xl:grid-cols-5 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-3 pt-4 relative">
                  <div
                    onClick={handleCreate}
                    className="h-full min-h-[180px] relative w-full rounded-2xl bg-transparent border-[2px] 2xl:border-[3px] dark:border-[#2b2b2b] border-text-color/10 text-text-color/20 dark:text-[#303030] dark:hover:border-[#484848] hover:border-text-color/30 cursor-pointer transition border-dashed flex flex-col items-center justify-center gap-2"
                  >
                    {createNew ? (
                      <div className="flex items-center justify-center flex-col text-center gap-1 text-text-color/70 dark:text-[#484848]">
                        <RiLoader5Fill className="text-2xl animate-spinLoader" />
                        <p className="line-clamp-2 max-w-[190px]">
                          Setting up <br /> your project...
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center flex-col gap-1">
                        <IoIosAddCircle className="text-5xl max-2xl:text-3xl text-text-color/70 dark:text-[#484848]" />
                        <p className="text-text-color/70 dark:text-[#b2b2b2] text-sm">
                          Create new project
                        </p>
                      </div>
                    )}
                  </div>
                  {myProjects.map((project, index) => (
                    <div
                      key={index}
                      className="group z-10 relative w-full h-fit"
                    >
                      <div
                        className={`absolute z-30 top-1 right-1 rounded-md flex items-center justify-center gap-0 bg-white dark:bg-[#242424] p-1 ${
                          deleteMenu === project._id && "opacity-100"
                        }`}
                      >
                        <button
                          onClick={() =>
                            handleTrashProject(project._id, project.name)
                          }
                          title="Move to Trash"
                          className={`h-[35px] w-auto aspect-square min-w-fit flex items-center justify-center gap-1 font-medium text-xs text-text-color/70 dark:text-[#858585] tracking-tight rounded-full line-clamp-1 relative cursor-pointer hover:bg-stone-200/60 dark:hover:bg-[#2c2c2c] `}
                        >
                          {deleting === project._id ? (
                            <RiLoader5Fill className="text-2xl animate-spinLoader" />
                          ) : (
                            <LuTrash2 className="text-lg  min-w-fit " />
                          )}
                        </button>
                      </div>

                      <Link
                        key={project._id}
                        to={`/project/${w1}/${project._id}`}
                        className={`group cursor-pointer w-full h-full p-4 rounded-xl shadow-sm bg-white dark:bg-[#242424] group-hover:ring-2 group-hover:ring-main-color/60 dark:text-[#b8b8b8] ring-1 ring-border-line-color/50 dark:ring-transparent flex flex-col relative ${
                          deleteMenu === project._id &&
                          "ring-2 ring-main-color/60"
                        }`}
                      >
                        <div className="h-[50px] text-2xl w-[50px] bg-stone-100 dark:bg-[#303030] text-[#979797] min-h-fit min-w-fit aspect-square rounded-full mb-2 flex items-center justify-center">
                          <LuHash />
                        </div>
                        <h1 className="font-medium text-base leading-7 line-clamp-1">
                          {project.name === "" ? "Untitled" : project.name}
                        </h1>
                        <p className="line-clamp-1 leading-4 text-sm font-normal text-text-color/70 dark:text-[#b8b8b8]/70 min-h-[15px]">
                          {project.desc === ""
                            ? "no description"
                            : project.desc}
                        </p>
                        <div className="flex items-center gap-3 py-3">
                          <h1 className="text-sm">
                            {Math.round(
                              (allTasks.filter(
                                (task) =>
                                  task.projectId === project._id &&
                                  task.curentStatus === "completed"
                              ).length /
                                allTasks.filter(
                                  (task) => task.projectId === project._id
                                ).length) *
                                100
                            ) || 0}
                            %
                          </h1>
                          <div
                            className="flex w-full h-1.5 bg-gray-200 dark:bg-[#414141] rounded-full overflow-hidden"
                            role="progressbar"
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <div
                              className={`flex flex-col justify-center rounded-full overflow-hidden text-xs text-white text-center whitespace-nowrap transition duration-500 ${getProgressClasses(
                                Math.round(
                                  (allTasks.filter(
                                    (task) =>
                                      task.projectId === project._id &&
                                      task.curentStatus === "completed"
                                  ).length /
                                    allTasks.filter(
                                      (task) => task.projectId === project._id
                                    ).length) *
                                    100
                                )
                              )}`}
                              style={{
                                width: `${Math.round(
                                  (allTasks.filter(
                                    (task) =>
                                      task.projectId === project._id &&
                                      task.curentStatus === "completed"
                                  ).length /
                                    allTasks.filter(
                                      (task) => task.projectId === project._id
                                    ).length) *
                                    100
                                )}%`,
                              }}
                            ></div>
                          </div>
                          <h1 className="text-sm">100%</h1>
                        </div>
                        <div className="w-full flex items-end justify-between">
                          <div className="w-full flex items-start justify-start flex-col gap-2">
                            <p className="w-fit flex items-center justify-start text-xs gap-1 font-medium text-text-color/70 dark:text-[#b8b8b8]/70">
                              <TbStack className="text-xl" />
                              {
                                projectBoards.filter(
                                  (board) => board.belongsTo === project._id
                                ).length
                              }{" "}
                              {projectBoards.filter(
                                (board) => board.belongsTo === project._id
                              ).length > 1 ||
                              projectBoards.filter(
                                (board) => board.belongsTo === project._id
                              ).length === 0
                                ? "Boards"
                                : "Board"}
                            </p>
                            <p className="w-fit flex items-start justify-end text-xs font-medium px-[2px] text-text-color/70 dark:text-[#b8b8b8]/70">
                              {project.progress === 100
                                ? "Completed"
                                : format(
                                    new Date(project.createdAt),
                                    "MMM dd, y"
                                  )}
                            </p>
                          </div>
                          <div className="flex items-center justify-start mt-3">
                            <div
                              title={userEmail}
                              className="h-7 w-auto aspect-square rounded-full flex items-center justify-center bg-main-color dark:bg-[#424242] text-white text-base font-semibold ring-[3px] ring-white dark:ring-[#242424] uppercase"
                            >
                              {userEmail.charAt(0)}
                            </div>
                            {project.collaborations
                              .filter((em) => em !== userEmail)
                              .slice(0, 2)
                              .map((collab, index) => (
                                <div
                                  key={index}
                                  title={collab}
                                  className="h-7 w-auto aspect-square rounded-full flex items-center justify-center bg-main-color dark:bg-[#424242] text-white text-base font-semibold ml-[-5px] ring-[3px] ring-white dark:ring-[#242424] uppercase"
                                >
                                  {collab.charAt(0)}
                                </div>
                              ))}
                            {project.collaborations.length > 3 && (
                              <div className="h-7 w-auto aspect-square rounded-full flex items-center justify-center bg-main-color dark:bg-[#424242] text-white text-sm font-medium ml-[-5px] ring-[3px] ring-white dark:ring-[#242424] uppercase">
                                +{project.collaborations.length - 3}
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        {/* <button onClick={handleLogout} title='Login with Google' className='w-[200px] h-[40px] ring-1 ring-border-line-color rounded-md font-semibold flex items-center justify-center gap-1 transition hover:opacity-80'>
        Logout
      </button> */}
      </div>
    </div>
  );
}
export default Projects;
