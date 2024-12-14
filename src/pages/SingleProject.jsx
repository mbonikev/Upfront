import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import {
  Link,
  useFetcher,
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Sidebar from "../components/Sidebar";
import {
  LuArchive,
  LuArrowLeft,
  LuArrowRight,
  LuCheck,
  LuCheckCircle,
  LuChevronsDown,
  LuChevronsRight,
  LuChevronsUp,
  LuChevronsUpDown,
  LuClipboard,
  LuFlag,
  LuHash,
  LuMessageCircle,
  LuMoreHorizontal,
  LuPencilLine,
  LuPlus,
  LuPrinter,
  LuRecycle,
  LuRefreshCcw,
  LuRefreshCw,
  LuScissors,
  LuSendToBack,
  LuSparkles,
  LuStar,
  LuTimerReset,
  LuTrash2,
  LuUsers2,
} from "react-icons/lu";
import axios from "axios";
import { IoChevronDown, IoFolderOpen } from "react-icons/io5";
import ProfileDropdownButtons from "../components/ProfileDropdownButtons";
import logo60 from "../assets/logo-60x60.png";
import { GiConsoleController } from "react-icons/gi";
import AddCollaborators from "../components/AddCollaborators";
import debounce from "lodash/debounce";
import { RiLoader5Fill } from "react-icons/ri";
import DeleteContent from "../components/DeleteContent";
import { HiMiniBars2, HiMiniBars3, HiMiniMinus } from "react-icons/hi2";
import { ConfigProvider, theme, DatePicker } from "antd";
const { RangePicker } = DatePicker;
import { Input } from "antd";
const { TextArea } = Input;
import { Select, Space } from "antd";
import { format } from "date-fns";
function SingleProject() {
  const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_API;
  const { username, userEmail } = useOutletContext();
  const [profileMenu, setProfileMenu] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [deleteMenu, setDeleteMenu] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  // spaces
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const { workspacename, id } = useParams();
  // board
  const [addBoard, setAddBoard] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [fromSpace, setFromSpace] = useState("");
  const [collaborations, setCollaborations] = useState([]);
  const { workspace } = location.state || {};
  const [users, setUsers] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [addingBoard, setAddingBoard] = useState(false);
  const [addingTask, setAddingTask] = useState(false);
  const textareaRef = useRef(null);
  const textareaRef2 = useRef(null);
  const textareaRef3 = useRef(null);
  const textareaRefTask = useRef(null);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDue, setNewTaskDue] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("Medium");
  const [newBoardValue, setNewBoardValue] = useState("");
  const [boards, setBoards] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [placement, SetPlacement] = useState("bottomLeft");
  const [createNewTask, setCreateNewTask] = useState("");
  // Scolling horizonaly
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [moreOpt1, setMoreOpt1] = useState("");
  const [showAi, setShowAi] = useState(false);
  const [animateShowAi, setAnimateShowAi] = useState(false);
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event) => {
      setIsDarkMode(event.matches);
    };

    // Listen for changes in the dark mode preference
    mediaQuery.addEventListener("change", handleChange);

    // Cleanup listener on component unmount
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);
  // Swoll with click
  const onMouseDown = (e) => {
    // Check if the left mouse button is clicked
    if (e.button !== 0) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };
  const onMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Adjust the scroll speed
    containerRef.current.scrollLeft = scrollLeft - walk;
  };
  const onMouseUp = () => {
    setIsDragging(false);
  };
  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mouseleave", onMouseUp);
    return () => {
      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mouseleave", onMouseUp);
    };
  }, [isDragging, startX, scrollLeft]);
  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      // Create a temporary span to measure the text width
      const tempSpan = document.createElement("span");
      tempSpan.style.visibility = "hidden";
      tempSpan.style.position = "absolute";
      tempSpan.style.whiteSpace = "pre";
      tempSpan.style.fontSize = getComputedStyle(input).fontSize;
      tempSpan.textContent = projectTitle || input.placeholder;
      document.body.appendChild(tempSpan);
      const width = tempSpan.offsetWidth + 100; // Add extra padding
      document.body.removeChild(tempSpan);
      input.style.width = `${width}px`;
    }
  }, [projectTitle]);
  const showPMenu = () => {
    setProfileMenu(!profileMenu);
    setUserMenu(false);
    setDeleteMenu(false);
  };
  const showUserMenu = () => {
    setUserMenu(!userMenu);
    setProfileMenu(false);
    setDeleteMenu(false);
  };
  const showDeleteMenu = () => {
    setDeleteMenu(!deleteMenu);
    setUserMenu(false);
    setProfileMenu(false);
  };
  // get project details
  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/getproject`, {
          params: { id, userEmail },
        });
        setProjectTitle(response.data.name);
        setProjectDesc(response.data.desc);
        document.title = response.data.name + " - Upfront";
        // setFetching(false)
        setFromSpace(response.data.workspace);
        setCollaborations(response.data.collaborations);
      } catch (error) {
        // console.log(error)
        if (error.response.status === 401) {
          navigate("/");
        }
        if (error.response.status === 400) {
          navigate("/");
        }
      }
    };
    const getBoards = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/getboards`, {
          params: { projectId: id, email: userEmail },
        });
        // console.log(response.data)
        setBoards(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const getTasks = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/gettasks`, {
          params: { projectId: id, email: userEmail },
        });
        // console.log(response.data)
        setTasks(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchData = async () => {
      await Promise.all([getProject(), getBoards(), getTasks()]);
      setFetching(false);
    };
    const getusers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/getusers`);
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    getTasks();
    getBoards();
    getusers();
    getProject();
  }, []);
  const saveInputs = async (newInput1, newInput2) => {
    try {
      // console.log(newInput1, newInput2, id, userEmail)
      const response = await axios.patch(`${apiUrl}/api/updateprojectdetails`, {
        newTitle: newInput1,
        newDesc: newInput2,
        projectid: id,
        userEmail,
      });
      setSaving(false);
      document.title = response.data.namew + " - Upfront";
    } catch (err) {
      console.error(err);
      setSaving(false);
    }
  };
  // Debounce the save function
  const debouncedSaveInputs = useCallback(
    debounce((newInput1, newInput2) => {
      saveInputs(newInput1, newInput2);
    }, 800),
    []
  );
  const handleInput1Change = (e) => {
    setSaving(true);
    const newInput1 = e.target.value;
    setProjectTitle(newInput1);
    debouncedSaveInputs(newInput1, projectDesc);
    textareaRef2.current.style.height = "auto";
    textareaRef2.current.style.height = `${e.target.scrollHeight}px`;
  };
  const handleInput2Change = (e) => {
    setSaving(true);
    const newInput2 = e.target.value;
    setProjectDesc(newInput2);
    debouncedSaveInputs(projectTitle, newInput2);
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${e.target.scrollHeight}px`;
  };
  useEffect(() => {
    // Adjust the height of the textarea when the component mounts or the text changes
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    if (textareaRef2.current) {
      textareaRef2.current.style.height = "auto";
      textareaRef2.current.style.height = `${textareaRef2.current.scrollHeight}px`;
    }
    if (textareaRef3.current) {
      textareaRef3.current.style.height = "auto";
      textareaRef3.current.style.height = `${textareaRef3.current.scrollHeight}px`;
    }
  }, [projectDesc, projectTitle, newTaskName]);
  const handleTrashProject = async () => {
    setDeleting(true);
    try {
      const response = await axios.post(`${apiUrl}/api/movetotrash`, {
        projectId: id,
        userEmail,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
      setDeleting(false);
    }
  };
  const handleNewBoard = async (e) => {
    e.preventDefault();
    setAddingBoard(true);
    try {
      const response = await axios.post(`${apiUrl}/api/newboard`, {
        newBoardValue,
        projectId: id,
        userEmail,
      });
      setAddBoard(false);
      setAddingBoard(false);
      setNewBoardValue("");
      // console.log(response)
      setBoards((prevBoards) => [
        ...prevBoards,
        { id: response.data.id, name: response.data.name },
      ]);
    } catch (err) {
      console.log(err);
      setAddingBoard(false);
    }
  };
  // new task
  const handleNameChange = (event) => {
    setNewTaskName(event.target.value);
    textareaRef3.current.style.height = "auto";
    textareaRef3.current.style.height = `${event.target.scrollHeight}px`;
  };
  const onRangeChange = (date, dateString) => {
    setNewTaskDue(dateString);
  };
  const handlePriorityChange = (value) => {
    setNewTaskPriority(value);
  };
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const handleCreateTask = async (e) => {
    setAddingTask(true);
    e.preventDefault();
    // console.log(
    //   newTaskName,
    //   newTaskDue,
    //   newTaskPriority,
    //   createNewTask,
    //   getCurrentDate()
    // );
    try {
      const response = await axios.post(`${apiUrl}/api/newtask`, {
        newTaskName,
        newTaskDue,
        startingOn: getCurrentDate(),
        newTaskPriority,
        assignedTo: userEmail,
        boardId: createNewTask,
        projectId: id,
        userEmail,
      });
      // console.log(response.data)
      setTasks((prevTasks) => [
        ...prevTasks,
        {
          id: response.data.id,
          name: response.data.name,
          priority: response.data.priority,
          assignedTo: response.data.assignedTo,
          startingOn: response.data.startingOn,
          due: response.data.due,
          boardId: response.data.boardId,
        },
      ]);
      setCreateNewTask("");
      setAddingTask(false);
    } catch (err) {
      console.log(err);
      setAddingTask(false);
    }
  };
  // Delete Board
  const handleDeleteBoard = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`${apiUrl}/api/`, {});
      console.log("Response data:", response.data);
    } catch (err) {
      console.error("Error updating data:", err);
    }
  };
  // show more
  const showMoreMenuw1 = (id) => {
    setMoreOpt1(id);
  };
  const handleCancel = () => {
    setMoreOpt1("");
  };

  // handle print
  const handlePrint = () => {
    window.print();
  };
  const linkStyle =
    "min-h-[30px] w-full flex items-center gap-2 px-2 py-[3px] font-normal text-text-color/90 dark:text-[#b8b8b8] tracking-tight rounded-md line-clamp-1 relative";

  const handleShowAi = () => {
    setShowAi(true);
    setTimeout(() => {
      setAnimateShowAi(true);
    }, 100);
  };
  const handleHideAi = () => {
    setAnimateShowAi(false);
    setTimeout(() => {
      setShowAi(false);
    }, 200);
  };

  return (
    <>
      {/* create with AI button */}
      <button
        onClick={handleShowAi}
        className="group overflow-clip w-[40px] h-[40px] hover:w-[150px] fixed z-10 bottom-5 right-5 flex items-center justify-center gap-1 text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300 bg-white dark:bg-[#242424] text-dark-body dark:text-white ring-1 ring-stone-200 dark:ring-stone-300/10 active:bg-stone-100 dark:active:bg-[#313131] active:scale-[.99] shadow-lg"
      >
        <LuSparkles className="text-lg min-w-fit ml-[4px] group-hover:ml-0 transition-all duration-200" />
        <span className="whitespace-nowrap transition-all w-0 group-hover:w-[95px] overflow-hidden">
          Create with AI
        </span>
      </button>

      {/* Ai overlay */}
      <div
        onClick={handleHideAi}
        className={` top-0 left-0 w-full h-full z-30 bg-transparent ${
          showAi ? "fixed cursor-default" : "hidden"
        }`}
      ></div>
      {/* Ai Modal */}
      {showAi && (
        <div
          className={`w-[350px] h-[400px] max-h-[400px] p-2 fixed bottom-4 right-4 rounded-xl shadow-lg ring-1 ring-border-line-color/30 dark:ring-stone-600/40 overflow-y-auto z-50 bg-white dark:bg-[#242424] transition-all duration-300
            ${animateShowAi ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"} `}
        >
          
        </div>
      )}

      {/* profile menu overlay */}
      <div
        onClick={() => setProfileMenu(false)}
        className={` top-0 left-0 w-full h-full z-30 bg-transparent ${
          profileMenu ? "fixed cursor-default" : "hidden"
        }`}
      ></div>
      {/* collab Menu overlay */}
      <div
        onClick={() => setUserMenu(false)}
        className={` top-0 left-0 w-full h-full z-30 bg-transparent ${
          userMenu ? "fixed cursor-default" : "hidden"
        }`}
      ></div>
      {/* delete Menu overlay */}
      <div
        onClick={() => setDeleteMenu(false)}
        className={` top-0 left-0 w-full h-full z-30 bg-transparent ${
          deleteMenu ? "fixed cursor-default" : "hidden"
        }`}
      ></div>
      {/* more options board menu */}
      <div
        onClick={handleCancel}
        className={` top-0 left-0 w-full h-full z-20 bg-transparent ${
          moreOpt1 ? "fixed cursor-default" : "hidden"
        }`}
      ></div>
      {/* Menu */}
      <div className="w-full h-fit flex flex-col justify-center sticky top-0 items-start z-30 bg-white">
        {/* profile dropdown */}
        {profileMenu && (
          <div className="w-[290px] h-fit max-h-[80vh] absolute top-[52px] right-3 rounded-xl shadow-custom ring-1 ring-border-line-color/0 overflow-y-auto z-50">
            <ProfileDropdownButtons username={username} />
          </div>
        )}
        {/* Collab dropdown */}
        {userMenu && (
          <div className="w-[290px] h-fit max-h-[80vh] absolute top-[52px] right-[210px] rounded-xl shadow-custom ring-1 ring-border-line-color/0 overflow-y-auto z-50">
            <AddCollaborators
              users={users}
              username={username}
              collaborations={collaborations}
              userEmail={userEmail}
              id={id}
              setCollaborations={setCollaborations}
            />
          </div>
        )}
        {/* Delete Dropdown */}
        {deleteMenu && (
          <div className="w-[290px] h-fit max-h-[80vh] p-2 absolute top-[52px] right-[240px] rounded-xl shadow-custom ring-1 ring-border-line-color/0 overflow-y-auto z-50 bg-white dark:bg-[#242424] ">
            <p className="text-sm text-text-color/70 dark:text-[#b8b8b8] px-2 pt-2 pb-4">
              <span className="font-medium text-text-color dark:text-white">
                Warning!{" "}
              </span>{" "}
              Deleting this project will remove it from your workspace and move
              it to trash. Collaborations will be stashed for possible future
              restoration
            </p>
            <p className="text-sm text-text-color/70 dark:text-[#b8b8b8] px-2 pb-4">
              {" "}
              Some fields, like{" "}
              <span className="font-medium text-text-color dark:text-white">
                'createdAt'
              </span>{" "}
              will reset during restore.
            </p>
            <div className="flex items-center justify-end">
              <button
                onClick={handleTrashProject}
                title="Trash"
                className="bg-red-500 text-white transition text-xs font-semibold h-[35px] py-0 px-3 w-full gap-1 shadow-md rounded-lg inline-flex items-center justify-center"
              >
                {deleting ? (
                  <RiLoader5Fill className="text-2xl animate-spinLoader" />
                ) : (
                  <>
                    <LuTrash2 className="text-lg" />
                    <span className="text-sm font-medium tracking-tight">
                      Move to Trash
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
        <div className="w-full h-fit flex items-start justify-between px-5 py-3 bg-white dark:bg-dark-body">
          <div className=" min-h-[35px] flex items-center justify-start gap-0 ">
            <div className="flex items-center justify-start gap-3 text-sm mr-2">
              <Link
                to={`/`}
                title="Deadlines"
                className="text-xl h-[25px] w-auto aspect-square flex items-center justify-center rounded-full transition bg-stone-100 hover:bg-stone-200 dark:text-[#b8b8b8] dark:bg-transparent dark:hover:bg-[#2c2c2c]"
              >
                <LuArrowLeft />
              </Link>
              <button
                title="Deadlines"
                className="opacity-40 pointer-events-none text-xl h-[25px] w-auto aspect-square flex items-center justify-center rounded-full transition bg-stone-100 hover:bg-stone-200 dark:text-[#b8b8b8] dark:bg-transparent dark:hover:bg-[#2c2c2c]"
              >
                <LuArrowRight />
              </button>
            </div>
            <div className="flex items-center justify-start gap-[2px] max-md:hidden text-sm text-text-color/70 dark:text-[#b8b8b8]">
              <BreadCrumb name={"Workspaces"} status={"off"} link={"/"} /> /
              <BreadCrumb name={workspacename} status={"on"} link={"/"} /> /
              <BreadCrumb name={projectTitle} status={"off"} link={"/"} />
            </div>
          </div>
          <div className="flex items-center justify-end gap-0">
            <button
              title="File update status"
              className=" h-[34px] p-1 w-auto aspect-square flex items-center justify-center rounded-full transition hover:bg-stone-100 text-text-color/70 hover:text-text-color dark:text-[#b8b8b8]/70 dark:hover:bg-[#2c2c2c] dark:hover:text-[#b8b8b8] "
            >
              {saving ? (
                <LuRefreshCw className="text-lg animate-spinSlow" />
              ) : (
                <LuCheck className="text-xl" />
              )}
            </button>
            <button
              onClick={handlePrint}
              title="Print view"
              className="text-lg h-[34px] p-1 w-auto aspect-square flex items-center justify-center rounded-full transition hover:bg-stone-100 text-text-color/70 hover:text-text-color dark:text-[#b8b8b8]/70 dark:hover:bg-[#2c2c2c] dark:hover:text-[#b8b8b8] "
            >
              <LuPrinter />
            </button>
            <button
              onClick={showDeleteMenu}
              title="Move to trash"
              className="text-lg h-[34px] p-1 w-auto aspect-square flex items-center justify-center rounded-full transition hover:bg-stone-100 text-text-color/70 hover:text-red-500 dark:text-[#b8b8b8]/70 dark:hover:bg-[#2c2c2c] "
            >
              <LuTrash2 />
            </button>
            <button
              onClick={showUserMenu}
              title="Manage Collaborators"
              className="text-xl h-[34px] p-1 w-auto aspect-square flex items-center justify-center rounded-full transition hover:bg-stone-100 text-text-color/70 hover:text-text-color dark:text-[#b8b8b8]/70 dark:hover:bg-[#2c2c2c] dark:hover:text-[#b8b8b8] "
            >
              <LuUsers2 />
            </button>
            <button
              title="Mark as favorite"
              className="text-xl h-[34px] p-1 w-auto aspect-square flex items-center justify-center rounded-full transition hover:bg-stone-100 text-text-color/70 hover:text-text-color dark:text-[#b8b8b8]/70 dark:hover:bg-[#2c2c2c] dark:hover:text-[#b8b8b8] "
            >
              <LuStar />
            </button>
            <button
              title="Dues"
              className="text-xl h-[34px] p-1 w-auto aspect-square flex items-center justify-center rounded-full transition hover:bg-stone-100 text-text-color/70 hover:text-text-color dark:text-[#b8b8b8]/70 dark:hover:bg-[#2c2c2c] dark:hover:text-[#b8b8b8] "
            >
              <LuTimerReset />
            </button>
            <span className="w-[2px]"></span>
            <button
              onClick={showPMenu}
              className=" max-w-[120px] flex items-center justify-start gap-[2px] hover:bg-stone-100  text-text-color/70 hover:text-text-color dark:text-[#b8b8b8] dark:hover:bg-[#2c2c2c] dark:hover:text-[#b8b8b8] transition p-1 rounded-lg"
            >
              <p className="h-[26px] w-auto aspect-square rounded-full bg-main-color/90 transition flex items-center justify-center text-sm font-semibold text-white uppercase">
                {username.charAt(0)}
              </p>
              <p className="truncate font-medium pl-[3px] text-xs">
                {username}
              </p>
              <IoChevronDown className="min-w-[15px] text-xs" />
            </button>
          </div>
        </div>
      </div>
      <div
        className={`w-full min-h-svh text-text-color flex flex-col bg-white dark:bg-dark-body overflow-y-auto relative `}
      >
        {/* Project section */}
        {/* loader on fetch */}
        {fetching && (
          <div className="fixed top-0 z-10 left-0 w-full h-full bg-white dark:bg-dark-body flex items-center justify-center flex-col">
            <img
              src={logo60}
              loading="lazy"
              className="animate-bounce h-12 saturate-100 aspect-square"
            />
            <p className="py-0 text-sm font-medium text-text-color/70 dark:text-[#b8b8b8]/70 cursor-default">
              Loading Project..
            </p>
          </div>
        )}
        <div className="w-full h-fit pb-0 relative pl-10 pr-16 pt-10">
          <div className="w-full h-fit flex items-start justify-start mb-1 gap-3">
            <LuHash className="text-3xl mt-[3px] text-text-color/50 dark:text-[#858585]" />
            <div className="flex-1 flex flex-col items-start max-w-[1200px] justify-start gap-2 w-full h-fit">
              <textarea
                ref={textareaRef2}
                type="text"
                rows="1"
                value={projectTitle}
                onChange={handleInput1Change}
                placeholder="Project Name "
                className="text-3xl font-extrabold w-full placeholder:text-text-color/70 resize-none bg-white dark:bg-dark-body dark:placeholder:text-[#b8b8b8]/70 dark:text-[#d4d4d4]"
              />
              <textarea
                type="text"
                value={projectDesc}
                ref={textareaRef}
                onChange={handleInput2Change}
                rows="1"
                placeholder="a short description"
                className="text-base font-normal tracking-tight w-full placeholder:text-text-color/70 text-text-color resize-none overflow-hidden dark:bg-dark-body dark:placeholder:text-[#b8b8b8]/70 dark:text-[#d4d4d4]"
              ></textarea>
              {/* <div className="w-full h-[1px] bg-stone-200"></div> */}
            </div>
          </div>
        </div>
        <div
          className="w-full cursor-grab active:cursor-grabbing flex-1 h-fit flex items-start justify-start overflow-x-auto gap-2 relative pl-12 pr-5 py-10"
          ref={containerRef}
        >
          {boards.length > 0 &&
            boards.map((board, index) => (
              <div
                key={index}
                className=" w-[280px] min-w-[280px] bg-stone-200/40 dark:bg-[#202020] select-none flex flex-col px-2 pb-2 rounded-xl text-text-color dark:text-[#b8b8b8] relative "
              >
                {/* ------------------------------ */}
                <form onSubmit={handleDeleteBoard} className=" group ">
                  <div
                    onClick={() => showMoreMenuw1(board.id)}
                    className={` cursor-pointer absolute right-2 top-2 my-auto h-fit w-fit flex items-center justify-center opacity-100`}
                  >
                    <LuMoreHorizontal
                      className={`text-xl  ${
                        moreOpt1 === board.id
                          ? "text-text-color/100 dark:text-[#b8b8b8]"
                          : "text-text-color/30 hover:text-text-color dark:text-[#b8b8b8]/70 dark:hover:text-[#b8b8b8]"
                      }`}
                    />
                  </div>
                  {moreOpt1 === board.id && (
                    <>
                      <div className="absolute right-2 top-8 bg-white dark:bg-[#2c2c2c] rounded-xl w-fit min-w-[150px] max-w-[170px] h-fit shadow-xl z-20 ring-1 ring-border-line-color/50 dark:ring-transparent dark:shadow-custom2 p-2">
                        <div
                          className={`${linkStyle} cursor-pointer hover:bg-stone-200/70 dark:hover:bg-[#383838]`}
                        >
                          <LuPencilLine className="text-base  min-w-fit" />
                          <p className="line-clamp-1 text-sm">Rename</p>
                        </div>
                        <div
                          className={`${linkStyle} ${
                            tasks.filter((task) => task.boardId === board.id)
                              .length < 1
                              ? "pointer-events-none opacity-40"
                              : "hover:bg-stone-200/70 dark:hover:bg-[#484848] cursor-pointer"
                          }`}
                        >
                          <LuRecycle className="text-base  min-w-fit" />
                          <p className="line-clamp-1 text-sm">Clear Board</p>
                        </div>
                        <Link
                          to={"/"}
                          className={`${linkStyle} cursor-pointer hover:bg-stone-200/70 dark:hover:bg-[#484848]`}
                        >
                          <LuTrash2 className="text-base  min-w-fit text-red-500 dark:text-red-400" />
                          <p className="line-clamp-1 text-sm text-red-500 dark:text-red-400">
                            Delete Board
                          </p>
                        </Link>
                      </div>
                    </>
                  )}
                </form>
                <h1 className="text-xs py-3 font-semibold line-clamp-1 uppercase ">
                  <span>{board.name}</span>
                  <span className="pl-2 text-text-color/40">
                    {tasks.filter((task) => task.boardId === board.id).length}
                  </span>
                </h1>
                {/* task */}
                {tasks
                  .filter((task) => task.boardId === board.id)
                  .map((task) => (
                    <button
                      key={task.id}
                      className="w-full py-3 mb-2 h-fit bg-white dark:bg-[#2c2c2c] rounded-xl ring-1 ring-border-line-color/20 dark:ring-transparent hover:ring-2 hover:ring-main-color/60 "
                    >
                      {/* priority */}
                      <p
                        className={`ml-2 mb-2 w-full rounded-md flex items-center justify-start`}
                      >
                        {task.priority === "High" && (
                          <>
                            <LuChevronsUp className="text-xl text-[#ff5630]" />
                            <span className="text-xs font-semibold text-[#ff5630]">
                              {task.priority}
                            </span>
                          </>
                        )}
                        {task.priority === "Medium" && (
                          <>
                            <LuChevronsUpDown className="text-xl text-[#2684ff]" />
                            <span className="text-xs font-semibold text-[#2684ff]">
                              {task.priority}
                            </span>
                          </>
                        )}
                        {task.priority === "Low" && (
                          <>
                            <LuChevronsDown className="text-xl text-[#12c97d]" />
                            <span className="text-xs font-semibold text-[#12c97d]">
                              {task.priority}
                            </span>
                          </>
                        )}
                      </p>
                      {/* text */}
                      <p className="text-sm px-3 text-start">{task.name}</p>
                      {/* Comments & collaborations */}
                      <div className="px-3 flex items-center justify-between pt-2">
                        <div>
                          <div className="flex items-center gap-[2px] text-text-color/70 dark:text-[#b8b8b8]/70">
                            <LuMessageCircle className="text-lg" />
                            <span className="font-medium text-sm">0</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-end gap-1">
                          <div className="flex items-center justify-center">
                            <div className="h-7 w-auto aspect-square rounded-full flex items-center justify-center bg-main-color text-white text-base font-semibold ml-[-5px] ring-4 ring-white dark:ring-[#2c2c2c] uppercase">
                              {userEmail.charAt(0)}
                            </div>
                            {/* <p className="h-[22px] w-auto aspect-square rounded-full ml-[-4px] bg-purple-600 ring-2 ring-white transition flex items-center justify-center text-xs font-medium text-white uppercase">
                          {userEmail.charAt(0)}
                        </p>
                        <p className="h-[22px] w-auto aspect-square rounded-full ml-[-4px] bg-purple-600 ring-2 ring-white transition flex items-center justify-center text-xs font-medium text-white uppercase">
                          {userEmail.charAt(0)}
                        </p> */}
                          </div>
                        </div>
                      </div>
                      {/* Due */}
                      <p className="text-xs px-3 text-text-color/70 dark:text-[#b8b8b8]/70 flex items-center gap-1 pt-2 font-medium">
                        {task.startingOn === task.due ? (
                          <>
                            <span>{format(new Date(task.due), "MMM dd")}</span>
                          </>
                        ) : (
                          <>
                            <span>
                              {format(new Date(task.startingOn), "MMM dd")}
                            </span>
                            <span>
                              <LuArrowRight />
                            </span>
                            <span>{format(new Date(task.due), "MMM dd")}</span>
                          </>
                        )}
                      </p>
                    </button>
                  ))}
                {/* add new task */}
                {createNewTask === board.id ? (
                  <form
                    onSubmit={handleCreateTask}
                    className="w-full p-3 h-fit bg-white dark:bg-[#2c2c2c] rounded-xl ring-1 ring-border-line-color/20 dark:ring-transparent "
                  >
                    <textarea
                      placeholder="Task name"
                      onChange={handleNameChange}
                      rows="1"
                      ref={textareaRef3}
                      required
                      autoFocus
                      name="task name"
                      className="text-sm font-normal tracking-tight w-full placeholder:text-text-color/70 text-text-color resize-none overflow-hidden dark:bg-[#2c2c2c] dark:placeholder:text-[#b8b8b8]/70 dark:text-[#d4d4d4]"
                    />
                    <div className="flex mt-1 w-full gap-2">
                      <div className="flex flex-col">
                        <p className="text-xs text-text-color/70 dark:text-[#b8b8b8]/70 pb-1">
                          Due
                        </p>
                        <ConfigProvider
                          theme={{
                            algorithm: isDarkMode
                              ? darkAlgorithm
                              : defaultAlgorithm,
                            token: {
                              colorPrimary: "#404040", // Makes the input shadow transparent
                              colorErrorOutline: "transparent",
                              colorBgContainer: "transparent",
                            },
                          }}
                        >
                          <DatePicker
                            size="medium"
                            // style={{
                            //   color: "#2e394a",
                            //   width: "100%",
                            // }}
                            required
                            onChange={onRangeChange}
                            placeholder={"Due Date"}
                            placement={placement}
                            className="w-full text-sm border text-dark-body dark:text-white"
                          />
                        </ConfigProvider>
                      </div>
                      <div className="flex flex-col min-w-[100px]">
                        <p className="text-xs text-text-color/70 dark:text-[#b8b8b8]/70 pb-1">
                          Priority
                        </p>
                        <ConfigProvider
                          theme={{
                            algorithm: isDarkMode
                              ? darkAlgorithm
                              : defaultAlgorithm,
                            token: {
                              colorPrimary: "#404040", // Makes the input shadow transparent
                              colorErrorOutline: "transparent",
                              colorBgContainer: "transparent",
                            },
                            components: {
                              Select: {
                                controlItemBgActive: "#343434", // Background color for selected item
                                controlItemBgHover: "#40404040", // Optional: Background color on hover
                              },
                            },
                          }}
                        >
                          <Select
                            defaultValue="Medium"
                            placeholder="Set priority"
                            placement={placement}
                            style={{
                              width: "100%",
                              color: "#2e394a",
                            }}
                            required
                            onChange={handlePriorityChange}
                            options={[
                              {
                                value: "High",
                                label: "High",
                              },
                              {
                                value: "Medium",
                                label: "Medium",
                              },
                              {
                                value: "Low",
                                label: "Low",
                              },
                            ]}
                          />
                        </ConfigProvider>
                      </div>
                    </div>
                    <div className="select-none flex items-center justify-end gap-1 ">
                      <div
                        onClick={() => setCreateNewTask(false)}
                        title="Cancel"
                        className=" cursor-pointer active:scale-95 transition bg-stone-200 text-text-color dark:bg-[#383838] dark:text-body-color/90 font-semibold px-3 rounded-md mt-4 inline-flex items-center justify-center py-1 w-fit h-fit"
                      >
                        <span className="text-sm tracking-tight">Cancel</span>
                      </div>
                      <button
                        type="submit"
                        title="Create a new Task"
                        className=" active:scale-95 transition bg-main-color text-white font-semibold px-3 min-w-[60px] rounded-md mt-4 inline-flex items-center justify-center py-1 w-fit h-fit"
                      >
                        {addingTask ? (
                          <RiLoader5Fill className="text-xl animate-spinLoader" />
                        ) : (
                          <>
                            <span className="text-sm tracking-tight">Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => setCreateNewTask(board.id)}
                    title="Create a new board"
                    className="select-none font-normal gap-1 text-text-color/70 hover:text-text-color dark:text-[#b8b8b8]/70 dark:hover:text-[#b8b8b8] px-2 py-[5px] flex items-center bg-transparent hover:bg-stone-200/80 dark:hover:bg-[#2c2c2c] rounded-lg w-full"
                  >
                    <LuPlus className="text-lg" />
                    <span className="text-sm tracking-tight font-medium">
                      New
                    </span>
                  </button>
                )}
              </div>
            ))}
          {addBoard ? (
            <div className="w-[280px] min-w-[280px] h-fit rounded-xl bg-white dark:bg-[#2c2c2c94] border-[2px] border-dashed border-border-line-color/50 dark:border-[#2c2b2b] flex items-start justify-start p-2">
              <form
                onSubmit={handleNewBoard}
                className="w-full h-full flex flex-col justify-between"
              >
                <input
                  type="text"
                  value={newBoardValue}
                  onChange={(e) => setNewBoardValue(e.target.value)}
                  className="w-full text-xs uppercase font-semibold tracking-tight bg-transparent text-text-color/90 dark:text-[#b8b8b8]/90"
                  placeholder="Board title"
                  autoFocus
                  name="New board title"
                />
                <div className="flex items-center justify-end gap-1 select-none">
                  <div
                    onClick={() => setAddBoard(false)}
                    title="Cancel"
                    className=" cursor-pointer active:scale-95 transition bg-stone-200 text-text-color dark:bg-[#383838] dark:text-body-color/90 font-semibold px-3 rounded-md mt-3 inline-flex items-center justify-center py-1 w-fit h-fit"
                  >
                    <span className="text-sm tracking-tight">Cancel</span>
                  </div>
                  <button
                    type="submit"
                    title="Create a new board"
                    className=" active:scale-95 transition bg-main-color text-white font-semibold px-3 min-w-[60px] rounded-md mt-3 inline-flex items-center justify-center py-1 w-fit h-fit"
                  >
                    {addingBoard ? (
                      <RiLoader5Fill className="text-xl animate-spinLoader" />
                    ) : (
                      <>
                        <span className="text-sm tracking-tight">Add</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <button
              onClick={() => setAddBoard(true)}
              title="Create a new board"
              className=" font-normal gap-1 text-text-color/70 dark:text-[#b8b8b8]/70 hover:text-text-color dark:hover:text-[#b8b8b8] px-2 py-[5px] flex items-center hover:bg-stone-100/80 dark:hover:bg-[#2c2c2c] rounded-lg w-full min-w-[280px] max-w-[280px]"
            >
              <LuPlus className="text-lg" />
              <span className="text-sm tracking-tight font-medium">New</span>
            </button>
          )}
        </div>
        {/* </div> */}
      </div>
    </>
  );
}
export default SingleProject;
