import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { IoCloudDownload, IoArrowRedo } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";

import { client, urlFor } from "../client";
import { fetchUser } from "../utils/fetchUser";

const Pin = ({ pin: { postedBy, image, _id, destination, save } }) => {
  const [postHovered, setPostHovered] = useState(false);

  const navigate = useNavigate();

  const user = fetchUser();

  // prettier-ignore
  const alreadySaved = !!(save?.filter(item => item.postedBy?._id === user?.googleId))?.length; //throughs undefined add ?
  //   1 , [2,3,1] -> [1].length -> 1 -> !1 -> false -> !false -> true
  //   5 , [2,3,1] -> [].length -> 0 -> !0 -> true -> !true -> false

  const savePin = (id) => {
    if (!alreadySaved) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: user?.googleId,
            postedBy: {
              _type: "postedBy",
              _ref: user?.googleId,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
        });
    }
  };

  const deletePin = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className="relative cursor-zoom-in w-auto 
        hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img
          src={urlFor(image).width(250).url()}
          className="rounded-lg w-full"
          alt=""
        />

        {postHovered && (
          <div className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pt-2 pb-2 z-50">
            <div className="flex justify-between items-center">
              {/* download */}
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white w-9 h-9 rounded-full flex items-center justify-center 
                  text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                >
                  <IoCloudDownload />
                </a>
              </div>

              {/* savepost */}
              {alreadySaved ? (
                <button
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl shadow-md outline-none"
                >
                  {save?.length} Saved
                </button>
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl shadow-md outline-none"
                >
                  Save
                </button>
              )}
            </div>
            {/* destination */}
            <div className="flex justify-between items-center gap-2 w-full">
              {destination && (
                <a
                  href={destination}
                  target="_blank"
                  rel="norefferer"
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white flex items-center gap-2 text-black font-bold 
                      p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md  "
                >
                  <IoArrowRedo />
                  {
                    /* {destination.slice(8)} */
                    destination.length > 15
                      ? `${destination.slice(0, 15)}...`
                      : destination
                  }
                </a>
              )}
              {postedBy?._id === user?.googleId && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                  className="bg-white p-2 opacity-70 hover:opacity-100 text-red-500 font-bold  
                  text-base rounded-full shadow-md outline-none"
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      {/* created user profile */}
      <Link
        to={`user-profile/${postedBy?._id}`}
        className="flex gap-2 mt-2 items-center"
      >
        <img
          src={postedBy?.image}
          className="w-8 h-8 rounded-full object-cover"
          alt=""
        />
        <p className="font-semibold capitalize">{postedBy?.userName}</p>
      </Link>
    </div>
  );
};

export default Pin;
