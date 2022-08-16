import React from "react";
import "./header.scss";

function Header() {
  return (
    <div className="header">
        <div className="header__text">
            <div className="header__subtext">React & Node</div>
            <div className="header__maintext">Blog</div>
        </div>
        <img src="https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="header-img" />
    </div>
  );
}

export default Header;
