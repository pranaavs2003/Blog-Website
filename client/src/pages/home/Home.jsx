import React from "react";
import axios from "axios";
import "./home.scss";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Home() {
  window.scrollTo(0, 0);
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  //console.log(search);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <div className="home">
      <Header />
      <div className="content__container">
        <div className="posts">
          <Posts posts={posts} />
        </div>
        <div className="sidebar">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default Home;
