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

function UpfrontAi() {
  const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_API;
  const { username, userEmail } = useOutletContext();
  const [pageTitle, setPageTitle] = useState("Workspace 1");
  const inputRef = useRef(null);
  // spaces
  const [w1, setW1] = useState(null);

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
    getme();
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
      <Sidebar username={username} userEmail={userEmail} />
      <div
        className={`w-[calc(100%-256px)] h-full min-h-svh flex-1 text-text-color dark:text-[#e2e2e2] bg-white dark:bg-dark-body transition-all duration-500 ease-in-out z-10 overflow-clip flex items-center justify-start flex-col px-8 py-20 max-lg:py-8`}
      >
        <div className="w-full max-w-[900px] mx-auto h-full">
          {/* title */}
          <h1 className="text-5xl">
            Upfront <span className="font-Custom_1xb ">AI</span>
          </h1>
          <h1 className="text-base mt-2 font-normal text-text-color/70 dark:text-[#e2e2e2]/70 ">
            Your Intelligent Project Assistant
          </h1>
          <br />
          <h4>Coming soon..</h4>
          <br />
          <div class="flex flex-col gap-2">
            <h1 className="text-lg font-bold">🚀 Key Features</h1>
            <ol>
              <li>
                <strong className="font-Custom_b ">1. Natural Language Assistance:</strong> Interact with
                Upfront AI like a colleague—ask questions, assign tasks, or
                request updates in plain language.
              </li>
              <li>
                <strong className="font-Custom_b ">2. Customizable Workflows:</strong> Describe your needs,
                and Upfront AI will design and automate your workflows.
              </li>
              <li>
                <strong className="font-Custom_b ">3. Smart Task Suggestions:</strong> Get clear, actionable
                steps for complex tasks with AI recommendations.
              </li>
              <li>
                <strong className="font-Custom_b ">4. Meeting Summaries:</strong> Share notes or recordings,
                and the AI generates concise summaries and action items.
              </li>
              <li>
                <strong className="font-Custom_b ">5. Knowledge Hub:</strong> Access all project documents and
                conversations in one place with smart search.
              </li>
              <li>
                <strong className="font-Custom_b ">6. Multilingual Support:</strong> Collaborate globally with
                support for over 20 languages.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UpfrontAi;