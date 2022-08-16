import React, { useState } from "react";
import "./settings.scss";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function Settings() {
  window.scrollTo(0, 0);
  const { user, dispatch } = useContext(Context);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState();
  const [pic, setPic] = useState("");
  const [change, isChange] = useState(false);

  console.log(user.data);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type: "UPDATE_START"});

    try {
      const res = await axios.put("/users/" + user._id, {
        userId: user._id,
        username: username,
        email: email,
        password: password,
        profilePic: user.profilePic
      });
      dispatch({type: "UPDATE_SUCCESS", payload: res});
      console.log("User Updated Successfully");
    } catch (error) {
      dispatch({type: "UPDATE_FAILURE"});
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({type: "UPDATE_START"});
      try{
        const res = await axios.put("/users/" + user._id, {
          userId: user._id,
          profilePic: pic,
        });
        dispatch({type: "UPDATE_SUCCESS", payload: res});
        console.log("Profile Picture Updated Successfully!");
      }
      catch(error){
        dispatch({type: "UPDATE_FAILURE"});
      }
  }

  return (
    <div className="settings">
      <form className="settings__content">
        <div className="settings__heading">
          <div className="settings__headingLeft">Update your Account</div>
          <div className="settings__headingRight">Delete Account</div>
        </div>

        <div className="settings__profilePicture settings__container">
          <div className="settings__containerTitle">Profile Picture</div>
          <div className="settings__profilePicContainer">
            {user.profilePic ? (
              <img
                src={user.profilePic}
                alt="profile-pic"
                className="settings__profilePic"
              />
            ) : (
              <img
                src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"
                alt="profile-pic"
                className="settings__profilePic"
              />
            )}
            <button
              onClick={(e) => {
                e.preventDefault();
                change ? isChange(false) : isChange(true);
                console.log(change);
              }}
              className="settings__changePic"
            >
              +
            </button>
          </div>

          {change ? 
            <div className="add__imageUrl">
              <input type="text" name="pic_url" id="pic_url" placeholder="Enter Photo URL here" onChange={(e) => {setPic(e.target.value)}} />
              <button id="change_button" onClick={handleClick}>Change</button>
            </div> : <></>}

        </div>

        <div className="settings__username settings__container">
          <div className="settings__containerTitle">Username</div>
          <input
            type="text"
            name="username"
            placeholder="Safak"
            className="settings__input"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="settings__email settings__container">
          <div className="settings__containerTitle">Email</div>
          <input
            type="email"
            name="email"
            placeholder="Safak@gmail.com"
            className="settings__input"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled
          />
        </div>
        <div className="settings__password settings__container">
          <div className="settings__containerTitle">Password</div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="settings__input"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="settings__submitButton"
        >
          Update
        </button>
      </form>
      <Sidebar />
    </div>
  );
}
