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
  LuChevronsRight,
  LuChevronsUp,
  LuClipboard,
  LuFlag,
  LuHash,
  LuMessageCircle,
  LuPlus,
  LuPrinter,
  LuRefreshCcw,
  LuRefreshCw,
  LuScissors,
  LuSendToBack,
  LuStar,
  LuTimerReset,
  LuTrash2,
  LuUsers2,
} from "react-icons/lu";
import axios from "axios";
import { IoChevronDown } from "react-icons/io5";
import ProfileDropdownButtons from "../components/ProfileDropdownButtons";
import { useDraggable } from "react-use-draggable-scroll";
import logo60 from "../assets/logo-60x60.png";
import { GiConsoleController } from "react-icons/gi";
import AddCollaborators from "../components/AddCollaborators";
import debounce from "lodash/debounce";
import { RiLoader5Fill } from "react-icons/ri";
import DeleteContent from "../components/DeleteContent";
import { HiMiniBars2, HiMiniBars3, HiMiniMinus } from "react-icons/hi2";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
import { Input } from "antd";
const { TextArea } = Input;
import { Select, Space } from "antd";

function SingleProject() {
  const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_API;
  const { username, userEmail } = useOutletContext();
  const [profileMenu, setProfileMenu] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [deleteMenu, setDeleteMenu] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  // spaces
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const { workspacename, id } = useParams();
  // dragabble
  // const dragref = useRef(); // We will use React useRef hook to reference the wrapping div:
  // const { events } = useDraggable(dragref); // Now we pass the reference to the useDraggable hook:
  // board
  const [addBoard, setAddBoard] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [fromSpace, setFromSpace] = useState("");
  const [collaborations, setCollaborations] = useState([]);
  const location = useLocation();
  const { workspace } = location.state || {};
  const [users, setUsers] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [addingBoard, setAddingBoard] = useState(false);
  const textareaRef = useRef(null);
  const textareaRefTask = useRef(null);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDue, setNewTaskDue] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("Medium");
  const [newBoardValue, setNewBoardValue] = useState("");
  const [boards, setBoards] = useState([]);
  const [placement, SetPlacement] = useState('bottomLeft');
  const [createNewTask, setCreateNewTask] = useState('')

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
    setProfileMenu(true);
  };

  const showUserMenu = () => {
    setUserMenu(true);
  };

  const showDeleteMenu = () => {
    setDeleteMenu(true);
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

    const fetchData = async () => {
      await Promise.all([getProject(), getBoards()]);
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
  };

  const handleInput2Change = (e) => {
    setSaving(true);
    const newInput2 = e.target.value;
    setProjectDesc(newInput2);
    debouncedSaveInputs(projectTitle, newInput2);
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${e.target.scrollHeight}px`;
  };

  const handleNewTaskNameChange = (e) => {
    const newTask = e.target.value;
    setNewTaskName(newTask);
    textareaRefTask.current.style.height = "auto";
    textareaRefTask.current.style.height = `${e.target.scrollHeight}px`;
  };

  useEffect(() => {
    // Adjust the height of the textarea when the component mounts or the text changes
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [projectDesc]);

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
  const onRangeChange = (date, dateString) => {
    setNewTaskDue(dateString);
  };
  const handlePriorityChange = (value) => {
    setNewTaskPriority(value);
  };

  useEffect(() => {
    console.log("Due: " + newTaskDue)
    console.log("Priority: " + newTaskPriority)
  }, [newTaskDue, newTaskPriority])



  return (
    <>
      {/* profile menu overlay */}
      <div
        onClick={() => setProfileMenu(false)}
        className={` top-0 left-0 w-full h-full z-30 bg-transparent ${profileMenu ? "fixed" : "hidden"
          }`}
      ></div>

      {/* User Menu overlay */}
      <div
        onClick={() => setUserMenu(false)}
        className={` top-0 left-0 w-full h-full z-30 bg-transparent ${userMenu ? "fixed" : "hidden"
          }`}
      ></div>

      {/* delete Menu overlay */}
      <div
        onClick={() => setDeleteMenu(false)}
        className={` top-0 left-0 w-full h-full z-30 bg-transparent ${deleteMenu ? "fixed" : "hidden"
          }`}
      ></div>

      {/* profile dropdown */}
      {profileMenu && (
        <div className="w-[290px] h-fit max-h-[80vh] absolute top-[52px] right-3 rounded-xl shadow-custom ring-1 ring-border-line-color/0 overflow-y-auto z-50">
          <ProfileDropdownButtons username={username} />
        </div>
      )}

      {/* Menu dropdown */}
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
        <div className="w-[290px] h-fit max-h-[80vh] p-2 absolute top-[52px] right-[240px] rounded-xl shadow-custom ring-1 ring-border-line-color/0 overflow-y-auto z-50 bg-white">
          <p className="text-sm text-text-color/70 px-2 pt-2 pb-4">
            <span className="font-medium text-text-color">Warning! </span>{" "}
            Deleting this project will remove it from your workspace and move it
            to trash. Collaborations will be stashed for possible future
            restoration
          </p>
          <p className="text-sm text-text-color/70 px-2 pb-4">
            {" "}
            Some fields, like{" "}
            <span className="font-medium text-text-color">
              'createdAt'
            </span>{" "}
            will reset during restore.
          </p>
          <div className="flex items-center justify-end">
            <button
              onClick={handleTrashProject}
              title="Trash"
              className="bg-stone-100 hover:bg-red-500 hover:text-white transition text-xs font-semibold h-[35px] py-0 px-3 w-full gap-1 text-text-color/70 rounded-lg inline-flex items-center justify-center"
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

      <div
        className={`w-full min-h-svh text-text-color flex flex-col bg-white overflow-y-auto relative `}
      >
        <div className="w-full h-fit flex flex-col justify-center items-start z-20 bg-white">
          <div className="w-full h-fit flex items-start justify-between px-5 pt-3">
            <div className=" min-h-[35px] flex items-center justify-start gap-0 ">
              <div className="flex items-center justify-start gap-3 text-sm mr-2">
                <Link
                  to={`/`}
                  title="Deadlines"
                  className="text-xl h-[25px] w-auto aspect-square flex items-center justify-center rounded-full transition bg-stone-100 hover:bg-stone-200"
                >
                  <LuArrowLeft />
                </Link>
                <button
                  title="Deadlines"
                  className="opacity-40 pointer-events-none text-xl h-[25px] w-auto aspect-square flex items-center justify-center rounded-full transition bg-stone-100 hover:bg-stone-200"
                >
                  <LuArrowRight />
                </button>
              </div>
              <div className="flex items-center justify-start gap-[2px] text-sm text-text-color/70">
                <BreadCrumb name={"Workspaces"} status={"off"} link={"/"} /> /
                <BreadCrumb name={workspacename} status={"on"} link={"/"} /> /
                <BreadCrumb name={projectTitle} status={"off"} link={"/"} />
              </div>
            </div>
            <div className="flex items-center justify-end gap-0">
              <button
                title="File update status"
                className=" h-[34px] p-1 w-auto aspect-square flex items-center justify-center rounded-full transition hover:bg-stone-100 text-text-color/70 hover:text-text-color "
              >
                {saving ? (
                  <LuRefreshCw className="text-lg animate-spinSlow" />
                ) : (
                  <LuCheck className="text-xl" />
                )}
              </button>
              <button
                title="Print view"
                className="text-lg h-[34px] p-1 w-auto aspect-square flex items-center justify-center rounded-full transition hover:bg-stone-100 text-text-color/70 hover:text-text-color "
              >
                <LuPrinter />
              </button>
              <button
                onClick={showDeleteMenu}
                title="Move to trash"
                className="text-lg h-[34px] p-1 w-auto aspect-square flex items-center justify-center rounded-full transition hover:bg-stone-100 text-text-color/70 hover:text-red-500 "
              >
                <LuTrash2 />
              </button>
              <button
                onClick={showUserMenu}
                title="Manage Collaborators"
                className="text-xl h-[34px] p-1 w-auto aspect-square flex items-center justify-center rounded-full transition hover:bg-stone-100 text-text-color/70 hover:text-text-color "
              >
                <LuUsers2 />
              </button>

              <button
                title="Mark as favorite"
                className="text-xl h-[34px] p-1 w-auto aspect-square flex items-center justify-center rounded-full transition hover:bg-stone-100 text-text-color/70 hover:text-text-color "
              >
                <LuStar />
              </button>
              <button
                title="Dues"
                className="text-xl h-[34px] p-1 w-auto aspect-square flex items-center justify-center rounded-full transition hover:bg-stone-100 text-text-color/70 hover:text-text-color "
              >
                <LuTimerReset />
              </button>
              <span className="w-[2px]"></span>
              <button
                onClick={showPMenu}
                className=" max-w-[120px] flex items-center justify-start gap-[2px] hover:bg-stone-100  text-text-color/70 hover:text-text-color transition p-1 rounded-lg"
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

        {/* Project section */}

        {/* loader on fetch */}
        {fetching && (
          <div className="fixed top-0 z-10 left-0 w-full h-full bg-white flex items-center justify-center flex-col">
            <img
              src={logo60}
              loading="lazy"
              className="animate-bounce h-12 saturate-100 aspect-square"
            />
            <p className="py-0 text-sm font-medium text-text-color/70 cursor-default">
              Loading Project..
            </p>
          </div>
        )}

        <div className="w-full h-fit pb-0 max-w-[1500px] mx-auto relative pl-10 pr-16 pt-10">
          <div className="w-full h-fit flex items-start justify-start mb-1 gap-3">
            <LuHash className="text-3xl text-lime-600 mt-1" />
            <div className="flex-1 flex flex-col items-start justify-start gap-2 w-full h-fit">
              <input
                ref={inputRef}
                type="text"
                value={projectTitle}
                onChange={handleInput1Change}
                placeholder="Project Name "
                className="text-3xl font-extrabold tracking-tight truncaten placeholder:text-text-color/70"
              />
              <textarea
                type="text"
                value={projectDesc}
                ref={textareaRef}
                onChange={handleInput2Change}
                rows="1"
                placeholder="a short description"
                className="text-sm font-normal tracking-tight w-full truncaten placeholder:text-text-color/70 text-text-color resize-none overflow-hidden"
              ></textarea>
              {/* <div className="w-full h-[1px] bg-stone-200"></div> */}
            </div>
          </div>
        </div>

        <div
          className="w-full flex-1 h-fit flex items-start justify-start gap-2 overflow-x-auto overflow-y-hidden scrollable-container relative pl-12 pr-0 pt-5"
        // {...events}
        // ref={dragref}
        >
          {boards.length > 0 &&
            boards.map((board, index) => (
              <div
                key={index}
                className="min-h-[200px] w-[280px] min-w-[280px] bg-stone-200/40 select-none flex flex-col px-2 pb-3 rounded-xl text-text-color"
              >
                <h1 className="text-xs py-3 font-semibold line-clamp-1 uppercase">
                  <span>{board.name}</span>
                  <span className="pl-2">3</span>
                </h1>
                {/* task */}
                <button
                  draggable
                  className="w-full py-3 mb-2 h-fit bg-white rounded-lg ring-1 hover:scale-105 hover:rotate-1 transition ring-border-line-color/20 "
                >
                  {/* priority */}
                  <p
                    className={`ml-2 mb-2 text-[#ff5630] w-full rounded-md flex items-center justify-start`}
                  >
                    <LuChevronsUp className="text-xl" />
                    <span className="text-xs font-semibold">Low</span>
                  </p>
                  {/* text */}
                  <p className="text-sm px-3 text-start">
                    Lorem ipsum dolor sit amet tenetur sint rem culpa illum.
                  </p>
                  {/* Comments & collaborations */}
                  <div className="px-3 flex items-center justify-between pt-2">
                    <div>
                      <div className="flex items-center gap-[2px] text-text-color/70">
                        <LuMessageCircle className="text-lg" />
                        <span className="font-medium text-sm">3</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-1">
                      <div className="flex items-center justify-center">
                        <p className="h-[22px] w-auto aspect-square rounded-full bg-main-color ring-2 ring-white transition flex items-center justify-center text-xs font-medium text-white uppercase">
                          {userEmail.charAt(0)}
                        </p>
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
                  <p className="text-xs px-3 text-text-color/70 flex items-center gap-1 pt-2 font-medium">
                    <span>Jun 30</span>
                    <span>
                      <LuArrowRight />
                    </span>
                    <span>Aug 12</span>
                  </p>
                </button>

                {/* add new task */}
                {createNewTask && (
                  <form className="w-full p-3 mb-2 h-fit bg-white rounded-lg ring-1 ring-border-line-color/20 ">
                    <TextArea
                      placeholder="Task name"
                      style={{
                        borderColor: "transparent",
                        padding: 0,
                        boxShadow: "none",
                        borderRadius: 0,
                        fontSize: "14px",
                        color: "#2e394a",
                        fontWeight: 500,
                      }}
                      autoSize
                      required
                    />
                    <div className="flex mt-1 w-full gap-2">
                      <div className="flex flex-col">
                        <p className="text-xs text-text-color/70 pb-1">Due</p>
                        <DatePicker
                          size="medium"
                          style={{
                            color: "#2e394a",
                            width: "100%",
                          }}
                          required
                          onChange={onRangeChange}
                          placeholder={"Due Date"}
                          placement={placement}
                        />
                      </div>
                      <div className="flex flex-col min-w-[100px]">
                        <p className="text-xs text-text-color/70 pb-1">Priority</p>
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
                              value: "High", label: "High",
                            },
                            {
                              value: "Medium", label: "Medium",
                            },
                            {
                              value: "Low", label: "Low",
                            },
                          ]}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-1 ">
                      <div
                        onClick={() => setCreateNewTask(false)}
                        title="Cancel"
                        className=" cursor-pointer active:scale-95 transition bg-stone-200 text-text-color font-semibold px-3 rounded-md mt-4 inline-flex items-center justify-center py-1 w-fit h-fit"
                      >
                        <span className="text-sm tracking-tight">Cancel</span>
                      </div>
                      <button
                        type="submit"
                        title="Create a new Task"
                        className=" active:scale-95 transition bg-main-color text-white font-semibold px-3 min-w-[60px] rounded-md mt-4 inline-flex items-center justify-center py-1 w-fit h-fit"
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
                )}
                {!createNewTask && (
                  <button
                    onClick={() => setCreateNewTask(true)}
                    title="Create a new board"
                    className=" font-normal gap-1 text-text-color/70 hover:text-main-color px-2 py-[5px] flex items-center bg-stone-200/80 rounded-lg w-full"
                  >
                    <LuPlus className="text-lg" />
                    <span className="text-sm tracking-tight font-medium">
                      New
                    </span>
                  </button>
                )}
              </div>
            ))}

          {addBoard && (
            <div className="w-[230px] min-w-[230px] h-fit rounded-xl bg-white border flex items-start justify-start p-3">
              <form
                onSubmit={handleNewBoard}
                className="w-full h-full flex flex-col justify-between"
              >
                <input
                  type="text"
                  value={newBoardValue}
                  onChange={(e) => setNewBoardValue(e.target.value)}
                  className="w-full text-xs uppercase font-semibold tracking-tight bg-transparent text-text-color/90"
                  placeholder="Board title"
                  autoFocus
                  name="New board title"
                />
                <div className="flex items-center justify-end gap-1 ">
                  <div
                    onClick={() => setAddBoard(false)}
                    title="Cancel"
                    className=" cursor-pointer active:scale-95 transition bg-stone-200 text-text-color font-semibold px-3 rounded-md mt-4 inline-flex items-center justify-center py-1 w-fit h-fit"
                  >
                    <span className="text-sm tracking-tight">Cancel</span>
                  </div>
                  <button
                    type="submit"
                    title="Create a new board"
                    className=" active:scale-95 transition bg-main-color text-white font-semibold px-3 min-w-[60px] rounded-md mt-4 inline-flex items-center justify-center py-1 w-fit h-fit"
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
          )}
          {!addBoard && (
            <button
              onClick={() => setAddBoard(true)}
              title="Create a new board"
              className=" font-normal gap-1 text-text-color/70 hover:text-main-color px-2 py-[5px] flex items-center hover:bg-stone-100/80 rounded-lg w-full max-w-[280px]"
            >
              <LuPlus className="text-lg" />
              <span className="text-sm tracking-tight font-medium">
                New
              </span>
            </button>
          )}
        </div>

        {/* </div> */}
      </div>
    </>
  );
}

export default SingleProject;
