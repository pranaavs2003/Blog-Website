import React from "react";
import "./post.scss";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const PF = "http://localhost:5000/images/";

  return (
    <div className="post">
      <Link to={`/post/${post._id}`} className="link">
        <img src={PF + post.photo} alt="post-img" />
      </Link>
      <div className="post__tags">
        {post.categories.map((c) => (
          <span className="post__tagItem">{c}</span>
        ))}
        {/* {console.log(post.categories)} */}
      </div>
      <Link to={`/post/${post._id}`} className="link">
        <div className="post__title">{post.title}</div>
      </Link>
      <div className="post__time">
        {new Date(post.createdAt).toDateString()}
      </div>
      <div className="post__content">{post.desc}</div>
    </div>
  );
}
