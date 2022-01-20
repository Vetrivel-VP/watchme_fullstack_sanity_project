import React from "react";
import { NavLink, Link } from "react-router-dom";
import { RiHome7Fill } from "react-icons/ri";
import logo from "../assets/watchme.png";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";

const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize";

const categories = [
  { name: "Animals" },
  { name: "Games" },
  { name: "Photography" },
  { name: "Wallpapers" },
  { name: "Coders" },
  { name: "Devlopers" },
];

const SideBar = (user, closeToggle) => {
  const handleCloseSideBar = () => {
    if (closeToggle) closeToggle(false);
  };
  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide_scrollbar">
      <div className="flex flex-col">
        {/* sidebar Logo */}
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSideBar}
        >
          <img src={logo} alt="" className="w-full" />
        </Link>

        {/* Sidebat Navigation links */}
        <div className="flex flex-col gap-5">
          <NavLink
            to=""
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSideBar}
          >
            <RiHome7Fill /> Home
          </NavLink>

          <h3 className="mt2 px-5 text-base 2xl:text-xl ">
            Discover Categories
          </h3>
          {/* slicing it because last category is going to be other we dont want to include it */}
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              key={category.name}
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSideBar}
            >
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>

      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="flex items-center my-5 mb3 gap-2 p-2 bg-white rounded-lg shadow-lg mx-3"
          onClick={handleCloseSideBar}
        >
          <img
            src={user?.user?.image}
            className="w-10 h-10 rounded-full"
            alt=""
          />
          <p>{user?.user?.userName}</p>
        </Link>
      )}
    </div>
  );
};

export default SideBar;
