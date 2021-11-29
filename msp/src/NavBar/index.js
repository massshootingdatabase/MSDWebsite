import React from 'react';
import "./style.scss";
import { NavLink } from 'react-router-dom';
import msdLogo from "./msdLogo.png";

const NavBar = () =>{
  return (
    <div className="NavBar">
    <img className="logo" src={msdLogo} alt="logo" />
    <ul className="NavBarList">
    <li>
      <NavLink exact activeClassName="navActive" className="navItem" to="/">Home</NavLink>
    </li>
    <li>
      <NavLink activeClassName="navActive" className="navItem" to="/data">Data</NavLink>
    </li>
    <li>
      <NavLink activeClassName="navActive" className="navItem" to="/news">News</NavLink>
    </li>
    <li>
      <NavLink activeClassName="navActive" className="navItem" to="/getInvolved">Get Involved</NavLink>
    </li>
    <li>
      <NavLink activeClassName="navActive" className="navItem" to="/Map/index.html">Map</NavLink>
    </li>
    </ul>
    </div>
) }

 export default NavBar 