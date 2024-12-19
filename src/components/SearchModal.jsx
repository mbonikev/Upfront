import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import { IoFolderOpen } from "react-icons/io5";
import { LuFiles, LuSearch } from "react-icons/lu";
import { PiPersonSimpleRunBold, PiProjectorScreenChart } from "react-icons/pi";

function SearchModal() {
  return (
    <div className="w-[810px] h-full px-5 py-[15px] flex flex-col">
      <div className="flex items-center justify-start gap-3 h-[35px] px-1 text-[#a1a1a1]">
        <div>
          <LuSearch className="text-xl text-[#f0f0f0]" />
        </div>
        <input
          type="text"
          autoFocus={true}
          className="tracking-tight bg-transparent w-full text-lg text-[#f0f0f0] placeholder:text-[#a1a1a1]"
          placeholder="Project name, Task name, Template name or Keywords..."
        />
      </div>
      <div className="w-full flex-1 mt-6 flex items-start justify-start gap-5">
        <div className="w-1/3 h-full flex items-start justify-start flex-col gap-0.5">
          <button className="outline-none flex items-center justify-start bg-[#4b4b4b] dark:bg-[#383838] w-full h-[42px] px-3 rounded-xl gap-2 text-[#a1a1a1] text-[16px] font-medium ">
            <LuFiles className="text-xl" />
            <span className="text-[#f0f0f0] tracking-tight">Projects</span>
          </button>
          <button className="outline-none flex items-center justify-start hover:bg-[#4b4b4b] dark:hover:bg-[#383838] w-full h-[42px] px-3 rounded-xl gap-2 text-[#a1a1a1] text-[16px] font-medium ">
            <FiCheckCircle className="text-xl" />
            <span className="text-[#f0f0f0] tracking-tight">Tasks</span>
          </button>
          <button className="outline-none flex items-center justify-start hover:bg-[#4b4b4b] dark:hover:bg-[#383838] w-full h-[42px] px-3 rounded-xl gap-2 text-[#a1a1a1] text-[16px] font-medium ">
            <PiPersonSimpleRunBold className="text-xl" />
            <span className="text-[#f0f0f0] tracking-tight">Templates</span>
          </button>
        </div>
        <div className="w-2/3 h-full bg-green-500"></div>
      </div>
    </div>
  );
}

export default SearchModal;
