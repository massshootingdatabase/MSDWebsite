import React from "react";
import "./NavBar.scss";
import { NavLink } from "react-router-dom";
import msdLogo from "./msdLogo.png";

/*
    Since these are currently not populated, I am going to ommit them for now and focus on the home page.
    <li>
      <NavLink activeClassName="navActive" className="navItem" to="/news">News</NavLink>
    </li>
    <li>
      <NavLink activeClassName="navActive" className="navItem" to="/getInvolved">Get Involved</NavLink>
    </li>
    <li>
      <NavLink activeClassName="navActive" className="navItem" to="/Home/stuff-for-mapbox">Map</NavLink>
    </li>
  */

const NavBar = () => {
  return (
    <div className="NavBar">
      <img className="logo" src={msdLogo} alt="logo" />
      <ul className="NavBarList">
        <li>
          <NavLink exact activeClassName="navActive" className="navItem" to="/">
            Mass Shooting Database
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="navActive" className="navItem" to="/data">
            Data
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="navActive" className="navItem" to="/login">
            Admin
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
