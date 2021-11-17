import React from 'react';
import "./style.scss";
import facebookIcon from "./Icons/facebook.png";
import emailIcon from "./Icons/gmail.png";
import twitterIcon from "./Icons/twitter.png";
import instagramIcon from "./Icons/instagram.png";
import venmoIcon from "./Icons/venmo.png"
import paypalIcon from "./Icons/paypal.png"


function Footer() {
  return (
    <div className="Footer">
    <ul className="FooterList">
    <li>
      <a href="http://www.facebook.com/YOURUSERNAMEHERE"><img className="icon" src={facebookIcon} alt="Facebook"/></a>
    </li>
    <li>
    <a href="https://www.instagram.com/themassshootingdatabase/"><img className="icon" src={instagramIcon} alt="Instagram" /></a>
    </li>
    <li>
    <a href="https://twitter.com/DatabaseMass"><img className="icon" src={twitterIcon} alt="Twitter"/></a>
    </li>
    <li>
    <a href="/getInvolved"><img className="icon" src={emailIcon} alt="Email"/></a>
    </li>
    <li>
    <a href="https://venmo.com"><img className="icon" src={venmoIcon} alt="Venmo"/></a>
    </li>
    <li>
    <a href="https://paypal.com"><img className="icon" src={paypalIcon} alt="Paypal"/></a>
    </li>
    </ul>
    <span className="copyright">Copyright © 2021 Mass Shooting Project</span>
    </div>
  )
}

export default Footer