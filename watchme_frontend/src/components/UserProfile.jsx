import React, { useState, useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import { GoogleLogout } from "react-google-login";

import {
  userSavedPinsQuery,
  userQuery,
  userCreatedPinsQuery,
} from "../utils/data";
import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const randomImage =
  "https://source.unsplash.com/1600x900/?nature,photography,technology";

const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-lg shadow-lg w-20 outline-none";
const notActiveBtnStyles =
  "bg-primary text-black mr-4 font-bold p-2 rounded-lg w-20 outline-none";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState("created");
  const [activeBtn, setActiveBtn] = useState("created");
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [text, userId]);

  useEffect(() => {
    if (text === "created") {
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);

      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, userId]);

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!user) {
    return <Spinner msg={"Loading user details"} />;
  }

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          {/* banner with user details */}
          <div className="flex flex-col justify-center items-center ">
            <img
              src={randomImage}
              alt=""
              className="w-full h-370 2xl:h-510 shadow-lg object-cover rounded-lg"
            />

            <img
              src={user.image}
              className="rounded-full w-20 h-20 -mt-10 shadow-2xl object-cover"
              alt=""
            />

            <h1 className="font-bold text-3xl text-center mt-3">
              {user.userName}
            </h1>

            <div className="absolute top-2 z-1 right-2 ">
              {userId === user._id && (
                <GoogleLogout
                  clientId={process.env.REACT_APP_GOOGLE_TOKEN}
                  render={(renderProps) => (
                    <button
                      type="button"
                      className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <AiOutlineLogout color="red" fontSize={21} />
                    </button>
                  )}
                  onLogoutSuccess={logOut}
                  cookiePolicy="single_host_origin"
                />
              )}
            </div>
          </div>

          {/* buttons */}
          <div className="text-center mb-7">
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("created");
              }}
              className={`${
                activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Created
            </button>
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("saved");
              }}
              className={`${
                activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Saved
            </button>
          </div>

          {/* deisplaying pins */}
          {pins?.length ? (
            <div className="px-2">
              <MasonryLayout pins={pins} />
            </div>
          ) : (
            <div className="flex justify-center items-center font-bold w-full text-xl mt-2">
              No Pins Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
