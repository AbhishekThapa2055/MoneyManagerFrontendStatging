import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";
import { FaBars } from "react-icons/fa";
import { assets } from "../assets/assets.js";
import { FaUser } from "react-icons/fa6";
import { FaRightFromBracket } from "react-icons/fa6";
import Sidebar from "./Sidebar.jsx";
const Menubar = ({ activeMenu }) => {
  const [openSideMenu, setopenSideMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
  }, [showDropdown]);

  return (
    <div className="flex items-center justify-between gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-4 sm:px-7 sticky top-0 z-30 ">
      {/* left  side - menu button and title */}
      <div className="flex items-center gap-5 ">
        <button
          onClick={() => setopenSideMenu(!openSideMenu)} //this code help to set the state toogle
          className="block lg:hidden text-black hover:bg-gray-100 p-1 rounded transition-colors"
        >
          {openSideMenu ? <FaXmark /> : <FaBars />}
        </button>

        <div className="flex items-center gap-2">
          <img src={assets.logo} alt="logo" className="h-10 w-10"></img>
          <span className="text-lg font-medium text-black truncate">
            Money Manager
          </span>
        </div>
      </div>
      {/* right side - Avatar photo */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:bg-purple-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-purple-500 focus:text-white"
        >
          <FaUser />
        </button>
        {/* drop down menus */}
        {showDropdown && (
          <div className="absolute right-0 mt-z w-48 bg-white rounded-lg shadow-lg border-gray-200 py-1 z-50">
            {/* user info */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                  <FaUser className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {user.fullName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Drop options */}
            <div className="py-1"></div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
            >
              <FaRightFromBracket className="text-gray-500" />{" "}
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
      {/* mobile side menu */}
      {openSideMenu && (
        <div className="fixed left-0 right-0 bg-white border-b border-gray-200 lg:hidden z-20 top-[73px]">
          <Sidebar activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Menubar;
