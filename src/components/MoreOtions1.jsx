import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { LuMoreHorizontal } from "react-icons/lu";

const MoreOptionsMenu = ({ targetRef, onClose }) => {
  const [menuStyle, setMenuStyle] = useState({});

  useEffect(() => {
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      setMenuStyle({
        position: "absolute",
        top: `${rect.bottom}px`,
        left: `${rect.left}px`,
      });
    }
  }, [targetRef]);

  return ReactDOM.createPortal(
    <div
      style={menuStyle}
      className="absolute bg-white shadow-md border rounded p-2 z-50"
    >
      <ul>
        <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={onClose}>
          Option 1
        </li>
        <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={onClose}>
          Option 2
        </li>
        <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={onClose}>
          Option 3
        </li>
      </ul>
    </div>,
    document.body
  );
};

export default MoreOptionsMenu