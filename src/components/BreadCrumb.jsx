import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function BreadCrumb({ name, link, status }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e) => {
    if (location.pathname === link) {
      e.preventDefault();
      navigate(link, { replace: true });
    }
  };

  return (
    <>
      {status === "on" ? (
        <Link
          className="py-1 px-[6px] text-xs font-medium hover:bg-stone-100 dark:text-light-text-color/70 dark:hover:text-light-text-color dark:hover:bg-[#2c2c2c] rounded-md text-text-color/70 cursor-pointer whitespace-nowrap max-w-[140px] truncate"
          to={link}
          onClick={handleClick}
        >
          {name}
        </Link>
      ) : (
        <button className="py-1 px-[6px] text-xs font-medium text-text-color/70 cursor-default whitespace-nowrap dark:text-light-text-color/70 max-w-[140px] truncate">
          {name}
        </button>
      )}
    </>
  );
}

export default BreadCrumb;
