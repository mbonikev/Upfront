import React from "react";
import logoSvg from "../assets/logo.svg";

function Loader() {
  return (
    <div className="fixed top-0 z-50 left-0 w-full h-full bg-white dark:bg-dark-body flex items-center justify-center flex-col gap-3">
      <img
        src={logoSvg}
        loading="lazy"
        className="h-16 saturate-100 aspect-square"
      />
      <span class="loader"></span>
    </div>
  );
}

export default Loader;
