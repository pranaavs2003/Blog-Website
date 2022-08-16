import React, { useContext, useState } from "react";
import "./write.scss";
import FileUploadSharpIcon from "@mui/icons-material/FileUploadSharp";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  //const [url, setUrl] = useState("https://images.pexels.com/photos/3635300/pexels-photo-3635300.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState("");
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tagArray = tags.split(",");
    const newPost = {
      username: user.username,
      title,
      desc,
      categories: tagArray,
    };
    if (file) {
      const data = new FormData();
      const fileName = String(Date.now()).slice(0, 10) + "myimage.jpg";
      console.log("Write.jsx>>>>>", fileName);
      data.append("name", fileName);
      data.append("file", file);
      newPost.photo = fileName;
      try {
        await axios.post("/upload", data);
      } catch (error) {}
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (error) {}
  };

  return (
    <div className="write">
      {file && (
        //<img className="writeImg" src={URL.createObjectURL(file)} alt="" />
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}

      <form className="write__form" onSubmit={handleSubmit}>
        <div className="input__groupTop">
          <label htmlFor="file__input">
            <FileUploadSharpIcon />
          </label>
          <input
            type="file"
            name="file"
            id="file__input"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            name="title-input"
            id="post__title"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="input__groupBottom">
          <textarea
            name="input__text"
            placeholder="Tell your story..."
            id="post__content"
            cols="30"
            rows="10"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <input
            type="text"
            name="tags"
            id="post__content"
            placeholder="Enter Tags here separated by comma.."
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <button type="submit" className="submit__button" onClick={handleSubmit}>
          Publish
        </button>
      </form>
    </div>
  );
}
