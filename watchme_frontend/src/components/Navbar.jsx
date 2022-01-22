import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  BiSearchAlt,
  BiPlus,
  BiChevronRight,
  BiChevronLeft,
} from "react-icons/bi";
import logo from "../assets/watchme.png";
import { RiHome7Fill } from "react-icons/ri";
import { useState } from "react";
import { useEffect } from "react";
import { categories } from "../utils/data";

const isNotActiveStyle =
  "flex items-center px-2 md:px-5 gap-2 md:gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";

const isActiveStyle =
  "flex items-center px-2 md:px-5 gap-2 md:gap-3 font-extrabold   transition-all duration-200 ease-in-out capitalize";

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const [isScroll, setScroll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {}, [isScroll]);

  if (!user) return null;

  const scrollOnClick = (side) => {
    setScroll(true);
    side === "right"
      ? (document.getElementById("category").scrollLeft += 200)
      : (document.getElementById("category").scrollLeft -= 200);
    document.getElementById("category").scrollLeft < 199
      ? setScroll(false)
      : setScroll(true);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center w-ful py-2">
        {/* logo */}
        <Link to="/">
          <img src={logo} alt="" className="w-40 cursor-pointer" />
        </Link>

        {/* search box */}
        <div className="flex justify-between items-center w-full bg-white p-2 shadow-md rounded-lg mx-4">
          <BiSearchAlt fontSize={30} />
          <input
            type="text"
            placeholder="Search"
            className="w-full outline-none border-none px-3 text-gray-800 font-semibold text-base"
            value={searchTerm}
            onFocus={() => navigate("/search")}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex justify-center items-center">
          <Link to="create-pin">
            <button
              type="button"
              className="w-36 min-w-36 p-2 text-base text-gray-700 border border-gray-300 
            rounded-md hover:shadow-xl duration-150 ease-in-out md:flex hidden"
            >
              Submit a photo
            </button>

            <div className="bg-black w-10 h-10 rounded-md md:hidden flex items-center justify-center">
              <BiPlus fontSize={24} className="text-white" />
            </div>
          </Link>

          <Link
            to={`user-profile/${user._id}`}
            className="flex items-center justify-center w-10 min-w-10 h-10 min-h-10 shadow-lg rounded-full bg-slate-500 ml-4"
          >
            <img src={user?.image} className="rounded-full" alt="" />
          </Link>
        </div>
      </div>

      {/* categories */}
      <div className="flex items-center w-ful py-2 ">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }
        >
          <RiHome7Fill fontSize={30} />
        </NavLink>

        <div className="h-6 w-[1px] bg-slate-500"></div>

        <div className="flex items-center w-full h-10 overflow-y-scroll hide_scrollbar relative">
          <div
            className={`${
              isScroll ? "flex" : "hidden"
            } absolute left-0 w-32 h-10  justify-start items-center bg-gradient-to-r from-gray-50 cursor-pointer `}
            onClick={() => scrollOnClick("left")}
            id="leftSide"
          >
            <BiChevronLeft fontSize={30} />
          </div>
          <div
            className="flex items-center w-full overflow-y-scroll hide_scrollbar scroll-smooth duration-150 ease-in-out"
            id="category"
          >
            {categories.slice(0, categories.length - 1).map((category) => (
              <NavLink
                key={category.name}
                to={`/category/${category.name}`}
                className={({ isActive }) =>
                  isActive ? isActiveStyle : isNotActiveStyle
                }
              >
                {category.name}
              </NavLink>
            ))}
          </div>
          <div
            className="absolute right-0 w-32 h-10 md:flex hidden justify-end items-center bg-gradient-to-l from-gray-50 cursor-pointer "
            onClick={() => scrollOnClick("right")}
          >
            <BiChevronRight fontSize={30} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
