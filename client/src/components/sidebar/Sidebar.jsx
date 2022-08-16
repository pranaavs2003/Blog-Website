import React, { useEffect, useState } from "react";
import "./sidebar.scss";
import { Link } from "react-router-dom";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import axios from "axios";

export default function Sidebar() {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/category");
      //console.log(res.data);
      setCats(res.data);
    };
    getCats();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__title">ABOUT ME</div>
      <img
        src="https://images.pexels.com/photos/12405196/pexels-photo-12405196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="about-me-img"
      />
      <div className="sidebar__text">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis quaerat
        quis exercitationem porro deserunt dicta molestiae saepe modi? Cum ut
        delectus, maiores provident dolorum qui eum ea totam eligendi
        perspiciatis!
      </div>
      <div className="categories__title sidebar__title">CATEGORIES</div>
      <div className="categories__items">
        <div className="category__itemContainer">
          {cats.slice(0, cats.length / 2).map((cat) => (
            <Link to={`/?cat=${cat.name}`} className="link">
              <div className="category__item">{cat.name}</div>
            </Link>
          ))}
        </div>
        <div className="category__itemContainer">
          {cats.slice(cats.length / 2, cats.length).map((cat) => (
            <Link to={`/?cat=${cat.name}`} className="link">
              <div className="category__item">{cat.name}</div>
            </Link>
          ))}
        </div>
      </div>
      <div className="followus__title sidebar__title">FOLLOW US</div>
      <div className="icons__list">
        <FacebookOutlinedIcon className="icon" />
        <InstagramIcon className="icon" />
        <TwitterIcon className="icon" />
        <PinterestIcon className="icon" />
      </div>
    </div>
  );
}
