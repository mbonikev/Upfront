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
      <div className="flex items-center justify-start gap-3 h-[45px] w-full mx-3 px-3 rounded-2xl text-[#a1a1a1] bg-[#2f2f2f]">
        <div>
          <LuSearch className="text-xl text-[#f0f0f0]" />
        </div>
        <input
          type="text"
          autoFocus={true}
          className="tracking-tight bg-transparent w-full text-base text-[#f0f0f0] placeholder:text-[#a1a1a1]"
          placeholder="Search..."
        />
      </div>
      <div className="w-full h-[1px] bg-[#353535] my-3"></div>
      <div className="w-full flex-1 flex items-start justify-start gap-5">
        <div className="w-1/3 h-full flex items-start justify-start flex-col gap-0.5">
          <button className="outline-none flex items-center justify-start bg-[#505050] dark:bg-[#2f2f2f] w-full h-[42px] px-3 rounded-xl gap-2 text-[#a1a1a1] text-[16px] font-medium ">
            <LuHash className="text-xl" />
            <span className="text-[#f0f0f0] tracking-tight">Projects</span>
          </button>
          <button className="outline-none flex items-center justify-start hover:bg-[#505050] dark:hover:bg-[#2f2f2f] w-full h-[42px] px-3 rounded-xl gap-2 text-[#a1a1a1] text-[16px] font-medium ">
            <FiCheckCircle className="text-xl" />
            <span className="text-[#f0f0f0] tracking-tight">Tasks</span>
          </button>
          <button className="outline-none flex items-center justify-start hover:bg-[#505050] dark:hover:bg-[#2f2f2f] w-full h-[42px] px-3 rounded-xl gap-2 text-[#a1a1a1] text-[16px] font-medium ">
            <PiPersonSimpleRunBold className="text-xl" />
            <span className="text-[#f0f0f0] tracking-tight">Templates</span>
          </button>
        </div>
        <div className="w-2/3 h-full flex flex-col pr-4">
          <span className=" font-medium text-sm px-3 text-[#989898] mb-2">
            Project Names
          </span>
          <div className="text-[#f0f0f0] flex items-center text-base justify-between cursor-pointer pl-[12px] pr-3 h-[40px] rounded-xl hover:bg-[#505050] dark:hover:bg-[#2f2f2f]">
            <span className=" font-normal text-sm">The Green Project</span>
            <span className="opacity-55 text-base">21</span>
          </div>
          <div className="text-[#f0f0f0] flex items-center text-base justify-between cursor-pointer pl-[12px] pr-3 h-[40px] rounded-xl hover:bg-[#505050] dark:hover:bg-[#2f2f2f]">
            <span className=" font-normal text-sm">The Green Project</span>
            <span className="opacity-55 text-base">21</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
