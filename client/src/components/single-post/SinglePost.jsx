import React from "react";
import { Link } from "react-router-dom";
import "./singlepost.scss";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import axios from "axios";
import { Context } from "../../context/Context";
import { useContext, useState } from "react";

export default function SinglePost({ post }) {
  window.scrollTo(0, 0);

  //console.log("post>>>>", post);
  const [change, setChange] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [desc, setDesc] = useState(post.desc);
  //console.log("desc>>>>", post)
  //console.log(post.data);

  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);

  const handleDelete = async () => {
    try {
      await axios.delete("/posts/" + post._id, {
        data: { username: user.username },
      });
      console.log("File deleted successfully!");
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      // await axios.put("/posts/"+post._id, {
      //   username: user.username,
      //   title,
      //   desc,
      // });
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      console.log("Post updated Successfully!");
      window.location.replace("/post/" + post._id);
      setChange(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="singlepost">
      <img src={PF + post.photo} alt="top-img" />

      <div className="title__container">
        <div className="title__left"></div>
        {change ? (
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="change__title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <div className="title__center">{post.title}</div>
        )}
        <div className="title__right">
          {post.username === user.username && !change ? (
            <div>
              <EditSharpIcon
                className="icon editIcon"
                onClick={() => {
                  setChange(true);
                }}
              />
              <DeleteOutlineSharpIcon
                className="icon deleteIcon"
                onClick={handleDelete}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="post__detail">
        <div className="author">
          Author:{" "}
          <Link to={`/?user=${post.username}`} className="link">
            <span className="author__name">{post.username}</span>
          </Link>
        </div>
        <div className="time">{new Date(post.createdAt).toDateString()}</div>
      </div>

      {change ? (
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          name="desc"
          className="change__desc"
          cols="30"
          rows="8"
          placeholder="Your Story goes here"
        ></textarea>
      ) : (
        <div className="post__content">{post.desc}</div>
      )}

      {change ? (
        <div className="button__container">
          <button
            className="cancel__button"
            onClick={() => {
              setChange(false);
            }}
          >
            Cancel
          </button>
          <button className="update__button" onClick={handleUpdate}>
            Update
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
