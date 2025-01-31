import React, { useEffect } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { IoFolderOpen } from "react-icons/io5";
import { LuFiles, LuHash, LuSearch } from "react-icons/lu";
import { PiPersonSimpleRunBold, PiProjectorScreenChart } from "react-icons/pi";

function SearchModal({ Hide }) {
  useEffect(() => {
    const handleKeyDown = (event) => event.key === "Escape" && Hide();
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [Hide]);
  return (
    <div className="w-[750px] h-full py-3 flex flex-col">
      <div className="flex items-center justify-start gap-3 h-[40px] mx-3 px-3 rounded-xl text-text-color bg-white dark:text-[#a1a1a1] dark:bg-[#2f2f2f]">
        <div>
          <LuSearch className="text-lg text-[#f0f0f0]" />
        </div>
        <input
          type="text"
          autoFocus={true}
          className="tracking-tight bg-transparent w-full text-sm text-[#f0f0f0] placeholder:text-[#a1a1a1]"
          placeholder="Search..."
        />
      </div>
      <div className="w-full h-[1px] bg-[#353535] my-3"></div>
      <div className="w-full flex-1 flex items-start justify-start gap-3 px-3">
        <div className="w-1/3 h-full flex items-start justify-start flex-col gap-1">
          <button className="outline-none flex items-center justify-start bg-[#505050] dark:bg-[#2f2f2f] w-full h-10 px-3 rounded-xl gap-2 text-[#a1a1a1] text-sm font-medium ">
            <LuHash className="text-lg" />
            <span className="text-[#f0f0f0] tracking-tight">Projects</span>
          </button>
          <button className="outline-none flex items-center justify-start hover:bg-[#505050] dark:hover:bg-[#2f2f2f] w-full h-10 px-3 rounded-xl gap-2 text-[#a1a1a1] text-sm font-medium ">
            <FiCheckCircle className="text-lg" />
            <span className="text-[#f0f0f0] tracking-tight">Tasks</span>
          </button>
          <button className="outline-none flex items-center justify-start hover:bg-[#505050] dark:hover:bg-[#2f2f2f] w-full h-10 px-3 rounded-xl gap-2 text-[#a1a1a1] text-sm font-medium ">
            <PiPersonSimpleRunBold className="text-lg" />
            <span className="text-[#f0f0f0] tracking-tight">Templates</span>
          </button>
        </div>
        <div className="w-2/3 h-full flex flex-col">
          <div className="text-[#f0f0f0]/60 flex items-center text-base justify-between cursor-pointer pl-[12px] pr-3 h-[40px] rounded-xl hover:bg-[#505050] dark:hover:bg-[#2f2f2f]">
            <span className=" font-normal text-sm">The Green Project</span>
            <span className="text-base">21</span>
          </div>
          <div className="text-[#f0f0f0]/60 flex items-center text-base justify-between cursor-pointer pl-[12px] pr-3 h-[40px] rounded-xl hover:bg-[#505050] dark:hover:bg-[#2f2f2f]">
            <span className=" font-normal text-sm">The Green Project</span>
            <span className="text-base">21</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
