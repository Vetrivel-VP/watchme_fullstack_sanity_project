import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import NotFound from "../assets/notFound.svg";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  // getting categoryid from the url
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  if (loading) return <Spinner msg="New feeds are loading" />;
  if (!pins?.length)
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <p>Sorry 🙇 No Feed Available</p>
        <img src={NotFound} className="w-[30%] mt-5" alt="" />
      </div>
    );
  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
