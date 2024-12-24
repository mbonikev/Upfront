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
  LuLoader2,
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
  LuX,
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
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { PiBroom } from "react-icons/pi";
import toast, { Toaster } from "react-hot-toast";

function SingleProject() {
  const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_API;
  const { username, userEmail } = useOutletContext();
  const [profileMenu, setProfileMenu] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [deleteMenu, setDeleteMenu] = useState(false);
  const [wipeMenu, setWipeMenu] = useState(false);
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
  const [wiping, setWiping] = useState(false);
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
  const [generateType, setGenerateType] = useState("Boards Only");
  const [projectDescription, setProjectDescription] = useState("");
  const [Aiboards, setAiBoards] = useState([]);
  const [generating, setGenerating] = useState(false);

  const generateBoards = async (e) => {
    e.preventDefault();
    setGenerating(true);
    try {
      const response = await axios.post(`${apiUrl}/api/generateBoards`, {
        projectDescription,
        userEmail,
        projectId: id,
        generateType,
      });

      // boards only
      if (generateType === "Boards Only") {
        setAiBoards(response.data.boards);
        setBoards((prevBoards) => [
          ...prevBoards,
          ...response.data.boards.map((board, index) => ({
            id: prevBoards.length + index,
            name: board.name.replace(/\*\*/g, "").trim(),
          })),
        ]);
      }
      setGenerating(false);
      toast.success("Generated successfully.");
    } catch (error) {
      setGenerating(true);
      toast.error(error.message);
    } finally {
      setGenerating(false);
    }
  };

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
    setWipeMenu(false);
  };
  const showUserMenu = () => {
    setUserMenu(!userMenu);
    setProfileMenu(false);
    setDeleteMenu(false);
    setWipeMenu(false);
  };
  const showDeleteMenu = () => {
    setDeleteMenu(!deleteMenu);
    setUserMenu(false);
    setProfileMenu(false);
    setWipeMenu(false);
  };
  const showWipeMenu = () => {
    setWipeMenu(!wipeMenu);
    setUserMenu(false);
    setProfileMenu(false);
    setDeleteMenu(false);
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
        if (error.response.status === 400 || error.response.status === 401) {
          navigate("/");
        }
      }
    };
    const getBoards = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/getboards`, {
          params: { projectId: id, email: userEmail },
        });
        // console.log(response.data);
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
    setSaving(true);
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
    const newInput1 = e.target.value;
    setProjectTitle(newInput1);
    debouncedSaveInputs(newInput1, projectDesc);
    textareaRef2.current.style.height = "auto";
    textareaRef2.current.style.height = `${e.target.scrollHeight}px`;
  };
  const handleInput2Change = (e) => {
    const newInput2 = e.target.value;
    setProjectDesc(newInput2);
    debouncedSaveInputs(projectTitle, newInput2);
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${e.target.scrollHeight}px`;
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.toLowerCase() === "s" && event.ctrlKey) {
        event.preventDefault();
        const currentTitle = document.getElementById("ProjectTitle");
        const currentDesc = document.getElementById("ProjectDesc");
        saveInputs(currentTitle.value, currentDesc.value);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
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
  const handleWipe = async (e) => {
    const choice = e;
    setWiping(choice);
    try {
      const response = await axios.post(`${apiUrl}/api/wipe`, {
        projectId: id,
        userEmail,
        choice,
      });
      // console.log(response);
      setWipeMenu(false);
      if (response.data.result !== null) {
        setProjectTitle(response.data.result.name);
        setProjectDesc(response.data.result.desc);
      }
      if (choice === "1") {
        setBoards([]);
        setTasks([]);
        toast.success("Boards Wiped");
      }
      if (choice === "2") {
        setTasks([]);
        toast.success("Tasks Wiped");
      }
      setWiping(false);
    } catch (error) {}
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

  const handleChooseGenerateType = (e) => {
    const value = e.target.value;

    setGenerateType(value);
  };

  const PromptTypes = ["Boards Only", "Boards & Tasks"];

  return (
    <>
      <Toaster
        position="bottom-left"
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
      {/* create with AI button */}
      <button
        onClick={handleShowAi}
        className="group overflow-clip w-[40px] h-[40px] hover:w-[150px] fixed z-10 bottom-5 right-5 flex items-center justify-center gap-1 text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300 bg-white dark:bg-[#242424] text-text-color dark:text-white ring-1 ring-stone-200 dark:ring-stone-300/10 active:bg-stone-100 dark:active:bg-[#313131] active:scale-[.99] shadow-lg"
      >
        <LuSparkles className="text-lg min-w-fit ml-[4px] group-hover:ml-0 transition-all duration-200" />
        <span className="whitespace-nowrap transition-all w-0 group-hover:w-[95px] overflow-hidden">
          Create with AI
        </span>
      </button>

      {/* Ai overlay */}
      <div
        onClick={handleHideAi}
        className={` top-0 left-0 w-full h-full z-40 bg-transparent  ${
          showAi ? "fixed cursor-default" : "hidden"
        }`}
      ></div>
      {/* Ai Modal */}
      {showAi && (
        <div
          className={`w-[330px] h-fit max-h-[370px] fixed bottom-4 right-4 rounded-xl shadow-lg ring-1 ring-border-line-color/30 dark:ring-stone-600/30 overflow-y-auto z-50 bg-white dark:bg-[#242424] transition-all duration-300 flex flex-col
            ${
              animateShowAi
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-full"
            } `}
        >
          <div className="flex items-center justify-between border-b dark:border-stone-600/30 p-2 text-text-color dark:text-white">
            <h1 className="text-sm font-semibold px-1">Create with AI</h1>
            <button
              onClick={handleHideAi}
              className="group overflow-clip w-[32px] h-[32px] flex items-center justify-center gap-1 text-sm font-semibold px-4 py-2 rounded-full transition hover:bg-stone-100 dark:hover:bg-[#303030] "
            >
              <LuX className="text-lg min-w-fit transition-all duration-200" />
            </button>
          </div>
          <form
            onSubmit={generateBoards}
            className="flex-1 px-3 py-4 flex flex-col gap-2"
          >
            {/* <h1 className="text-sm font-normal text-text-color dark:text-white">Project description</h1> */}
            <textarea
              autoFocus={true}
              className="w-full bg-stone-200/40 dark:bg-[#353535] h-[120px] resize-none rounded-xl leading-5 p-3 text-sm placeholder:text-text-color/50 dark:placeholder:text-white/40 font-medium text-text-color dark:text-white"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Describe your project..."
              required={true}
            ></textarea>
            <h1 className="text-sm font-normal text-text-color dark:text-white">
              Generate:
            </h1>
            <div className="flex items-center justify-start gap-2 flex-wrap">
              {PromptTypes.map((type, index) => (
                <label
                  key={index}
                  className={`w-fit h-[32px] flex items-center px-3 cursor-pointer ring-1 ring-stone-200 dark:ring-stone-500/20 rounded-full select-none
               ${
                 generateType === type
                   ? "b-white text-main-color dark:text-white dark:bg-[#383838] ring-main-color"
                   : "hover:bg-stone-100 dark:hover:bg-[#303030] text-text-color dark:text-[#b8b8b8]"
               }`}
                >
                  <div className="flex items-center justify-start gap-1 text-sm">
                    <input
                      type="checkbox"
                      onChange={handleChooseGenerateType}
                      name="generateType"
                      className="peer hidden"
                      value={type}
                    />
                    {generateType === type ? (
                      <LuCheck className="text-lg" />
                    ) : (
                      ""
                    )}
                    <h1>{type}</h1>
                  </div>
                </label>
              ))}
              <label
                className={`w-fit h-[32px] flex items-center px-3 cursor-not-allowed ring-1 ring-stone-200 dark:ring-stone-500/20 rounded-full select-none text-text-color dark:text-[#b8b8b8] opacity-50 "
               `}
              >
                <div className="flex items-center justify-start gap-1 text-sm">
                  <h1>Tasks Only </h1>
                </div>
              </label>
              <label
                className={`w-fit h-[32px] flex items-center px-3 cursor-not-allowed ring-1 ring-stone-200 dark:ring-stone-500/20 rounded-full select-none text-text-color dark:text-[#b8b8b8] opacity-50 "
               `}
              >
                <div className="flex items-center justify-start gap-1 text-sm">
                  <h1>Title and description </h1>
                </div>
              </label>
            </div>
            <button
              type="submit"
              className="group overflow-clip w-full h-[38px] mt-2 flex items-center justify-center gap-1 text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-300 bg-main-color text-white active:opacity-90 shadow-lg select-none"
            >
              {generating ? (
                <>
                  <LuLoader2 className="text-2xl min-w-fit transition-all duration-200 animate-spinLoader" />
                </>
              ) : (
                <>
                  <LuSparkles className="text-lg min-w-fit transition-all duration-200" />
                  <span className="whitespace-nowrap transition-all overflow-hidden">
                    Generate
                  </span>
                </>
              )}
            </button>
          </form>
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
      {/* Wipe Menu overlay */}
      <div
        onClick={() => setWipeMenu(false)}
        className={` top-0 left-0 w-full h-full z-30 bg-transparent ${
          wipeMenu ? "fixed cursor-default" : "hidden"
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
      <div className="w-full h-fit flex flex-col justify-center top-0 items-start z-30 bg-white fixed">
        {/* profile dropdown */}
        {profileMenu && (
          <div className="w-[290px] h-fit max-h-[80vh] absolute top-[52px] right-3 rounded-xl shadow-custom ring-1 ring-border-line-color/0 overflow-y-auto z-50">
            <ProfileDropdownButtons username={username} />
          </div>
        )}
        {/* Collab dropdown */}
        {userMenu && (
          <div className="w-[290px] h-fit max-h-[80vh] absolute top-[52px] right-[180px] rounded-xl shadow-custom ring-1 ring-border-line-color/0 overflow-y-auto z-50">
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
          <div className="w-[290px] h-fit max-h-[80vh] p-2 absolute top-[52px] right-[210px] rounded-xl shadow-custom ring-1 ring-border-line-color/0 overflow-y-auto z-50 bg-white dark:bg-[#242424] ">
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
        {/* Wiper Dropdown */}
        {wipeMenu && (
          <div className="w-[290px] h-fit max-h-[80vh] p-2 absolute top-[52px] right-[240px] rounded-xl shadow-custom ring-1 ring-border-line-color/0 overflow-y-auto z-50 bg-white dark:bg-[#242424] ">
            <p className="text-sm text-text-color/70 dark:text-[#b8b8b8] px-2 pt-2 pb-2">
              <span className="font-medium text-text-color dark:text-white">
                Wipe Out
              </span>
            </p>
            <div className="flex items-center justify-end flex-col gap-0">
              <button
                onClick={() => handleWipe("1")}
                title="Remove Boards & Tasks"
                className="hover:bg-stone-200/50 dark:hover:bg-[#303030] text-text-color  dark:text-[#b8b8b8] transition text-xs font-semibold h-[35px] py-0 px-3 w-full gap-2 rounded-lg inline-flex items-center justify-start"
              >
                {wiping === "1" ? (
                  <>
                    <RiLoader5Fill className="text-xl animate-spinLoader" />
                    <span className="text-sm font-medium tracking-tight">
                      Boards & Tasks
                    </span>
                  </>
                ) : (
                  <>
                    <PiBroom className="text-xl opacity-80" />
                    <span className="text-sm font-medium tracking-tight">
                      Boards & Tasks
                    </span>
                  </>
                )}
              </button>
              <button
                onClick={() => handleWipe("2")}
                title="Remove Boards & Tasks"
                className="hover:bg-stone-200/50 dark:hover:bg-[#303030] text-text-color  dark:text-[#b8b8b8] transition text-xs font-semibold h-[35px] py-0 px-3 w-full gap-2 rounded-lg inline-flex items-center justify-start"
              >
                {wiping === "2" ? (
                  <>
                    <RiLoader5Fill className="text-xl animate-spinLoader" />
                    <span className="text-sm font-medium tracking-tight">
                      Tasks Only
                    </span>
                  </>
                ) : (
                  <>
                    <PiBroom className="text-xl opacity-80" />
                    <span className="text-sm font-medium tracking-tight">
                      Tasks Only
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
              title={saving ? "Saving Changes" : "Changes saved"}
              className=" h-[34px] p-1 w-auto aspect-square flex items-center justify-center rounded-full transition hover:bg-stone-100 text-text-color/70 hover:text-text-color dark:text-[#b8b8b8]/70 dark:hover:bg-[#2c2c2c] dark:hover:text-[#b8b8b8] "
            >
              {saving ? (
                <div className="flex items-center justify-center gap-2">
                  <LuRefreshCw className="text-lg animate-spinSlow" />
                  <span className="font-semibold text-xs">Saving...</span>
                </div>
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
              onClick={showWipeMenu}
              title="Wipe"
              className="text-xl h-[34px] p-1 w-auto aspect-square flex items-center justify-center rounded-full transition hover:bg-stone-100 text-text-color/70 hover:text-text-color dark:text-[#b8b8b8]/70 dark:hover:bg-[#2c2c2c] dark:hover:text-[#b8b8b8] "
            >
              <PiBroom />
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
        className={`w-full min-h-svh pt-[40px] text-text-color flex flex-col bg-white dark:bg-dark-body overflow-y-auto relative `}
      >
        {/* Project section */}
        {/* loader on fetch */}
        {fetching && (
          <div className="fixed top-0 z-10 left-0 w-full h-full bg-white dark:bg-dark-body flex items-center justify-center flex-col">
            {/* <img
              src={logo60}
              loading="lazy"
              className="animate-bounce h-12 saturate-100 aspect-square"
            /> */}
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="300.000000pt"
              height="300.000000pt"
              viewBox="0 0 300.000000 300.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              {" "}
              <g
                transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)"
                fill="#488ef7"
                stroke="#488ef7"
              >
                {" "}
                <path d="M1340 2944 c-273 -35 -561 -157 -760 -323 -209 -174 -359 -390 -449 -644 -76 -217 -100 -482 -62 -703 28 -164 61 -266 137 -419 169 -342 470 -607 826 -726 50 -17 101 -33 112 -35 176 -40 376 -53 518 -35 491 64 897 343 1120 768 106 204 155 387 165 618 23 562 -283 1085 -785 1342 -215 110 -382 152 -627 158 -88 2 -176 1 -195 -1z m462 -48 c111 -24 132 -31 203 -62 17 -7 54 -22 83 -34 50 -20 201 -104 212 -118 3 -4 30 -24 60 -44 107 -72 258 -228 243 -251 -3 -6 -1 -7 5 -3 11 6 92 -91 92 -110 0 -6 12 -26 26 -45 23 -31 38 -59 92 -179 107 -238 135 -547 76 -869 -18 -101 -128 -366 -147 -354 -6 3 -7 1 -3 -5 7 -12 -13 -62 -25 -62 -4 0 -11 -9 -14 -20 -19 -59 -185 -252 -295 -342 -129 -106 -352 -230 -455 -253 -11 -2 -60 -15 -110 -29 -189 -51 -403 -58 -615 -19 -60 11 -204 53 -265 78 -85 34 -207 100 -216 118 -6 9 -14 15 -19 12 -6 -3 -15 -1 -22 5 -7 6 -39 29 -71 51 -31 22 -55 45 -51 50 3 5 0 8 -8 7 -7 -2 -12 3 -10 10 1 8 -2 11 -9 7 -14 -10 -171 155 -164 173 3 7 0 10 -5 7 -5 -3 -22 14 -37 37 -15 24 -36 52 -46 62 -24 27 -109 194 -146 288 -29 74 -56 175 -67 248 -3 19 -9 58 -14 85 -13 73 -5 316 14 418 19 107 45 199 54 193 4 -2 8 7 9 20 1 13 3 30 4 37 5 31 136 272 146 270 7 -2 10 4 7 12 -4 8 -1 15 5 15 6 0 11 6 11 13 0 23 133 181 143 170 3 -2 8 4 12 14 7 21 141 140 181 161 15 8 36 23 47 33 29 27 238 133 274 139 2 0 22 9 45 19 51 22 201 58 278 67 30 3 57 8 59 10 3 3 75 2 160 0 118 -3 185 -11 273 -30z" />{" "}
                <path d="M1405 2459 c-33 -10 -80 -27 -105 -38 -25 -10 -90 -38 -145 -61 -55 -23 -123 -53 -152 -66 -28 -13 -89 -39 -135 -58 -125 -51 -219 -91 -258 -111 -49 -23 -80 -71 -80 -122 0 -34 7 -49 40 -84 22 -24 40 -40 40 -35 0 4 12 1 28 -7 41 -22 341 -147 352 -147 6 0 10 -5 10 -12 0 -6 3 -8 6 -5 4 3 16 0 28 -8 11 -8 27 -15 36 -15 8 0 38 -12 65 -25 28 -14 53 -25 57 -25 7 0 36 -12 163 -69 92 -42 201 -35 333 20 40 16 78 27 84 23 6 -4 9 -3 5 2 -3 5 63 38 146 74 226 95 222 94 355 151 164 72 204 112 188 192 -11 52 -38 74 -145 120 -56 24 -98 47 -94 51 5 4 4 6 -2 5 -16 -5 -42 5 -195 70 -41 18 -84 36 -95 41 -11 5 -51 23 -88 39 -38 17 -71 31 -74 31 -2 0 -37 14 -76 31 -76 34 -166 59 -207 58 -14 -1 -52 -9 -85 -20z m570 -178 c209 -90 395 -170 413 -179 65 -30 81 -128 28 -170 -44 -34 -806 -354 -863 -361 -101 -14 -145 0 -556 174 -426 182 -447 194 -447 263 0 69 15 78 425 253 209 89 398 168 420 176 24 8 71 12 120 10 78 -4 88 -7 460 -166z" />{" "}
                <path d="M723 1660 c-43 -15 -95 -35 -116 -44 -73 -32 -99 -121 -54 -186 18 -27 50 -45 172 -98 83 -35 173 -74 200 -87 28 -12 75 -33 105 -45 30 -12 74 -31 97 -41 23 -11 44 -19 47 -19 3 0 42 -17 88 -38 114 -53 142 -61 223 -63 73 -2 133 10 200 40 22 10 81 35 130 56 50 21 109 46 132 57 24 11 49 21 57 22 8 1 22 8 32 16 9 8 19 14 21 12 2 -1 19 5 39 13 20 8 39 15 42 15 3 0 28 11 56 24 72 34 193 86 201 86 13 0 65 64 71 88 11 41 -5 89 -42 121 -19 17 -39 31 -45 31 -6 0 -7 5 -3 12 4 7 3 8 -4 4 -6 -4 -30 3 -54 15 -23 12 -69 24 -103 27 -56 4 -71 0 -195 -51 -74 -30 -176 -73 -227 -96 -169 -75 -206 -84 -313 -78 -80 5 -111 12 -195 45 -55 22 -119 50 -142 62 -23 12 -48 23 -55 24 -14 3 -66 25 -134 56 -22 10 -66 25 -97 33 -55 15 -59 14 -134 -13z m382 -108 c259 -111 294 -122 397 -122 100 0 139 12 403 126 274 118 297 121 429 64 110 -48 141 -103 97 -176 -16 -26 -70 -52 -422 -204 l-404 -174 -105 -1 -105 0 -403 174 c-427 184 -442 193 -442 258 0 51 27 82 100 115 149 68 162 67 455 -60z" />{" "}
                <path d="M2155 1168 c-22 -4 -49 -12 -60 -17 -65 -30 -282 -124 -290 -125 -5 -2 -35 -14 -65 -27 -112 -51 -165 -62 -264 -56 -95 6 -143 20 -303 91 -45 20 -86 36 -92 36 -6 0 -11 3 -11 8 0 4 -24 16 -52 26 -29 10 -76 29 -105 42 -79 36 -141 33 -249 -15 -100 -44 -134 -79 -134 -140 0 -59 37 -101 116 -135 38 -16 87 -37 109 -46 22 -10 56 -25 75 -33 19 -8 51 -21 70 -30 19 -8 85 -36 145 -62 61 -25 124 -52 140 -60 268 -119 343 -125 525 -45 36 16 115 50 175 75 146 62 159 68 238 104 37 17 70 31 73 31 4 0 38 15 78 33 39 19 87 39 106 46 75 26 111 119 71 184 -39 64 -214 132 -296 115z m-1062 -121 c271 -117 305 -127 409 -127 100 0 138 12 410 129 177 75 247 101 280 101 65 0 215 -65 239 -104 24 -39 24 -73 1 -111 -16 -26 -68 -51 -389 -188 -500 -213 -462 -200 -563 -194 -84 4 -90 6 -485 176 -269 115 -407 180 -422 197 -16 17 -23 38 -23 64 0 54 29 83 125 124 127 55 136 53 418 -67z" />{" "}
              </g>{" "}
            </svg>
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
                id="ProjectTitle"
                type="text"
                rows="1"
                value={projectTitle}
                onChange={handleInput1Change}
                placeholder="Project Name "
                className="text-3xl font-extrabold w-full placeholder:text-text-color/70 resize-none bg-white dark:bg-dark-body dark:placeholder:text-[#b8b8b8]/70 dark:text-[#d4d4d4]"
              />
              <textarea
                type="text"
                id="ProjectDesc"
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
                  <span className="pl-2 opacity-40">
                    {tasks.filter((task) => task.boardId === board.id).length}
                  </span>
                </h1>
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
                            className="w-full text-sm border text-text-color dark:text-white"
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
                {/* task */}
                {tasks
                  .filter((task) => task.boardId === board.id)
                  .map((task) => (
                    <button
                      key={task.id}
                      className="w-full py-3 mt-2 h-fit bg-white dark:bg-[#2c2c2c] rounded-xl ring-1 ring-border-line-color/20 dark:ring-transparent hover:ring-2 hover:ring-main-color/60 "
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
