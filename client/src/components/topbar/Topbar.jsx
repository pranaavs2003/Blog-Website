import React, { useContext } from "react";
import "./topbar.scss";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

function Topbar() {
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="topbar">
      <div className="left">
        <FacebookOutlinedIcon className="icon" />
        <InstagramIcon className="icon" />
        <TwitterIcon className="icon" />
        <PinterestIcon className="icon" />
      </div>
      <div className="center">
        <div className="nav__list">
          <div className="nav__listItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </div>
          <div className="nav__listItem">
            <Link className="link" to="/">
              ABOUT
            </Link>
          </div>
          <div className="nav__listItem">
            <Link className="link" to="/">
              CONTACT
            </Link>
          </div>
          <div className="nav__listItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </div>
          <div className="nav__listItem">
            {user ? (
              <span onClick={handleLogout}>LOGOUT</span>
            ) : (
              <Link className="link" to="/login">
                <span>LOGIN</span>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="right">
        {user ? (
          <Link to="/Settings">
            { user.profilePic ? <img
              src={user.profilePic}
              alt="profile-pic"
            /> : <img
              src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"
              alt="profile-pic"
            /> }
          </Link>
        ) : (
          <div className="nav__listItem">
            <Link to="/register" className="link">
              <span>REGISTER</span>
            </Link>
          </div>
        )}
        <SearchIcon />
      </div>
    </div>
  );
}

export default Topbar;
