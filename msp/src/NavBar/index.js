import React from 'react';
import "./style.scss";
import { NavLink } from 'react-router-dom';

const NavBar = () =>{
  return (
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
    </ul>
) }

 export default NavBar 