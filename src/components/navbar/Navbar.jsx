import React from "react";
import "./navbar.css";
import logo from "../../Assets/logo.svg";
import { Link } from "react-router-dom";
import Dropdown from "../dropdown/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { selectToggle, toggleActive } from "../../features/navSlice";
function Navbar() {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const toggle = useSelector(selectToggle);
  const dispatch = useDispatch();
  const toggler = () => {
    dispatch(toggleActive());
  };
  return (
    <nav className="nav">
      <div className="banner">
        <div className="nav__title">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          {user ? (
            <>
              <Dropdown />
            </>
          ) : (
            <>
              <div className="nav__toggle" onClick={toggler}>
                <span className={`${toggle ? "span1--active" : ""}`}></span>
                <span style={{ opacity: toggle ? "0" : "" }}></span>
                <span
                  style={{ transform: toggle ? "rotate(-45deg)" : "" }}
                ></span>
              </div>
              <ul className={`nav__list  ${toggle ? "active" : ""}`}>
                <li className="nav__item">
                  <Link className="nav__link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav__item">
                  <Link className="nav__link" to="/register">
                    Join Shortly
                  </Link>
                </li>
                <li className="nav__item">
                  <Link className="nav__link" to="/login">
                    Login
                  </Link>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
