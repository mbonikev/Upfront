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
            <Sidebar
                username={username}
                userEmail={userEmail}
            />
            <div
                className={`w-[calc(100%-256px)] h-full min-h-svh flex-1 text-text-color dark:text-[#e2e2e2] text-5xl bg-white dark:bg-dark-body transition-all duration-500 ease-in-out z-10 overflow-clip flex items-start justify-start flex-col p-1`}
            >
                {/* title */}
                <h1 className="">Upfront <span className="font-Custom_b">Ai</span></h1>
            </div>
        </div>
    );
}
export default UpfrontAi;
