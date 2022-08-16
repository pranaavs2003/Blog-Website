import React, { useEffect, useState } from "react";
import "./single.scss";
import SinglePost from "../../components/single-post/SinglePost";
import Sidebar from "../../components/sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function Single() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  //console.log(path);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      console.log(res.data);
      setPost(res.data);
    };
    getPost();
  }, [path]);

  return (
    <div className="single">
      <div className="content">
        <SinglePost post={post} />
        <Sidebar />
      </div>
    </div>
  );
}
