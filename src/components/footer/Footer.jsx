import React from "react";
import "./footer.css";
import { NavLink } from "react-router-dom";
import bg from "../../Assets/bg-shorten-desktop.svg";
import { useSelector } from "react-redux";
import flag from "./nigeria.svg";

function Footer() {
  const { user } = useSelector((state) => ({ ...state.auth }));
  return (
    <div className="footer">
      {!user && (
        <div className="upfooter" style={{ backgroundImage: `url(${bg})` }}>
          <h1>Boost your links today</h1>
          <NavLink to="/register" className="btn">
            Get Started
          </NavLink>
        </div>
      )}
      <div className="ftrinfo">
        <h1 className="ftrsection">Shortly</h1>

        {user ? (
          <div className="ftrsection">
            <NavLink exact to="/home" className="link">
              Home
            </NavLink>
            <NavLink id="link" className="link" to="/profile">
              Profile
            </NavLink>
          </div>
        ) : (
          <div className="ftrsection">
            <NavLink className="link" to="/login">
              Login
            </NavLink>
            <NavLink className="link" to="/register">
              Join Shortly
            </NavLink>
          </div>
        )}

        <p style={{ fontWeight: "500" }} className="footer__a">
          &#169; {new Date().getFullYear()}.{""}&nbsp;
          <a
            target="_blank"
            className="footer__a"
            href="https://henryogbu.netlify.app/"
            rel="noreferrer"
          >
            Made in &nbsp;
            <span>
              <img style={{ width: "30px" }} src={flag} alt="nigeria" />
            </span>{" "}
            &nbsp; by Henry Ogbu.
          </a>
        </p>
      </div>
    </div>
  );
}

export default Footer;
