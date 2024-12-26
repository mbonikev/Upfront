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
        <div className="flex flex-col gap-2 px-2 pt-2">
          <h1 className="font-normal text-sm">Workspace Name</h1>
          <input
            type="text"
            className="w-full h-[30px] rounded-lg px-3 ring-1 ring-stone-200"
          />
        </div>
        <div className="flex justify-end items-center gap-2 px-2">
          <div
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
            {false ? (
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
  );
}

export default CreateWorkspace;
