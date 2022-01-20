import React, { useState, useRef, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { IoCloseCircle, IoSettingsOutline } from "react-icons/io5";
import { BiMenuAltRight } from "react-icons/bi";

import { SideBar, UserProfile } from "../components";
import { client } from "../client";
import logo from "../assets/watchme.png";

import MainPin from "./MainPin";
import { userQuery } from "../utils/data";

const Home = () => {
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const [user, setUser] = useState(null);
  // categories Scroll references
  const scrollRef = useRef(null);

  // getting logged in user infor from the local browser storage
  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  // Fetch that matching user from the sanity
  useEffect(() => {
    // create the sanity query to access the sanity
    const query = userQuery(userInfo?.googleId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  useEffect(() => {
    // set scroll to the top of our page
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-full transition-height duration-75 ease-out ">
      {/* Main SideBar -> Tablet and Desktop */}
      <div className="hidden md:flex h-screen flex-initial">
        <SideBar user={user && user} closeToggle={setToggleSideBar} />
      </div>
      {/* Mobile Side Bar */}
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <BiMenuAltRight
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSideBar(true)}
          />

          <Link to="/">
            <img src={logo} alt="" className="w-28" />
          </Link>

          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="" className="w-28" />
          </Link>
        </div>

        {/* checking toogle sidebar - Sidebar COntent */}
        {toggleSideBar && (
          <div className="fixed w-1/2 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            {/* sidebar close button */}
            <div className="absolute w-full flex justify-end items-center p-2">
              <IoCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleSideBar(false)}
              />
            </div>

            <SideBar user={user && user} closeToggle={setToggleSideBar} />
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<MainPin user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
