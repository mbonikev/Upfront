import React from "react";
import { LuX } from "react-icons/lu";
import { RiLoader5Fill } from "react-icons/ri";

function CreateWorkspace({
  hide,
  create,
  creating,
  newWorkspaceName,
  setNewWorkspaceName,
}) {
  return (
    <div className="w-[330px] flex flex-col gap-2">
      <div className="w-full flex items-center justify-between gap-1 py-3 px-4 border-b border-stone-200 dark:border-[#474747] text-sm">
        <h1 className="font-medium tracking-tight text-base text-text-color dark:text-white">
          Create Workspace
        </h1>
        <button
          onClick={hide}
          className="h-[25px] w-[25px] rounded-lg text-base hover:bg-stone-100 dark:hover:bg-[#383838] aspect-square flex items-center justify-center"
        >
          <LuX />
        </button>
      </div>
      <form onSubmit={create} className="flex-1 flex flex-col gap-3 pt-1 pb-3 ">
        <div className="flex flex-col gap-2 px-4">
          <h1 className="font-normal text-sm">Workspace Name</h1>
          <input
            type="text"
            placeholder={`E.g "Company Name"`}
            autoFocus={true}
            required
            value={newWorkspaceName}
            onChange={(e) => setNewWorkspaceName(e.target.value)}
            className="w-full h-[33px] rounded-lg px-3 ring-1 ring-stone-200 focus:ring-2 focus:ring-main-color/60 dark:placeholder:text-stone-300/50 transition text-text-color dark:text-white bg-stone-100 dark:bg-[#404040] dark:ring-transparent "
          />
        </div>
        <div className="flex justify-end items-center gap-2 px-4 pb-1">
          <div
            onClick={hide}
            title="Cancel"
            className=" cursor-pointer active:scale-95 h-[35px] px-4 transition bg-stone-200 text-text-color dark:bg-[#424242] dark:text-body-color/90 font-semibold rounded-md inline-flex items-center justify-center text-sm"
          >
            <span className="text-sm tracking-tight">Cancel</span>
          </div>
          <button
            type="submit"
            title="Create a new Task"
            className=" active:scale-95 h-[35px] px-4 transition bg-main-color text-white font-semibold min-w-[60pxCancel] rounded-md inline-flex items-center justify-center text-sm"
          >
            {creating ? (
              <RiLoader5Fill className="text-xl animate-spinLoader" />
            ) : (
              <>
                <span className="text-sm tracking-tight">Create</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateWorkspace;
