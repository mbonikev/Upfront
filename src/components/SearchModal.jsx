import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import { IoFolderOpen } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";

function SearchModal() {
  return (
    <div className="w-[810px] h-[409px] p-5 flex flex-col">
      <div className="flex items-center justify-start gap-3 h-[35px] px-1 text-[#a1a1a1]">
        <div>
          <LuSearch className="text-xl text-white" />
        </div>
        <input
          type="text"
          autoFocus={true}
          className="tracking-tight bg-transparent w-full text-lg text-white placeholder:text-[#a1a1a1]"
          placeholder="Project name, Task name, Template name or Keywords..."
        />
      </div>
      <div className="w-full flex-1 mt-5 flex items-start justify-start gap-5">
        <div className="w-1/3 h-full flex items-start justify-start flex-col gap-0.5">
          <button className="outline-none flex items-center justify-start bg-[#4b4b4b] w-full h-[42px] px-3 rounded-xl gap-2 text-[#a1a1a1] text-[16px] font-medium ">
            <IoFolderOpen className="text-xl" />
            <span className="text-white tracking-tight">Projects</span>
          </button>
          <button className="outline-none flex items-center justify-start hover:bg-[#4b4b4b] w-full h-[42px] px-3 rounded-xl gap-2 text-[#a1a1a1] text-[16px] font-medium ">
            <FiCheckCircle className="text-xl" />
            <span className="text-white tracking-tight">Tasks</span>
          </button>
          <button className="outline-none flex items-center justify-start hover:bg-[#4b4b4b] w-full h-[42px] px-3 rounded-xl gap-2 text-[#a1a1a1] text-[16px] font-medium ">
            <IoFolderOpen className="text-xl" />
            <span className="text-white tracking-tight">Projects</span>
          </button>
        </div>
        <div className="w-2/3 h-full bg-green-500"></div>
      </div>
    </div>
  );
}

export default SearchModal;
