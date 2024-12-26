import React from "react";
import { LuX } from "react-icons/lu";

function CreateWorkspace() {
  return (
    <div className="w-[300px] flex flex-col gap-2">
      <div className="w-full flex items-center justify-between gap-1 p-2 border-b border-stone-200 dark:border-[#474747] text-sm">
        <h1 className="font-semibold">Create Workspace</h1>
        <button className="h-[25px] w-[25px] rounded-lg text-base hover:bg-stone-100 dark:hover:bg-[#383838] aspect-square flex items-center justify-center">
          <LuX />
        </button>
      </div>
      <form className="flex-1 flex flex-col gap-2">
        <div className="flex flex-col gap-2 px-2">
          <h1 className="font-normal text-sm">Workspace Name</h1>
          <input type="text" className="w-full h-[40px] px-3 border-stone-200" />
        </div>
      </form>
    </div>
  );
}

export default CreateWorkspace;
