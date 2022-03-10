import React, { useRef } from "react";
import "./dropdown.css";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../../features/authSlice";

const clickOutsideRef = (content_ref, toggle_ref) => {
  document.addEventListener("mousedown", (e) => {
    // user click toggle
    if (toggle_ref.current && toggle_ref.current.contains(e.target)) {
      content_ref.current.classList.toggle("active");
    } else {
      // user click outside toggle and content
      if (content_ref.current && !content_ref.current.contains(e.target)) {
        content_ref.current.classList.remove("active");
      }
    }
  });
};

function Dropdown() {
  const dropdown_toggle_el = useRef(null);
  const dropdown_content_el = useRef(null);
  const { user } = useSelector((state) => ({ ...state.auth }));

  clickOutsideRef(dropdown_content_el, dropdown_toggle_el);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setLogout());
  };
  return (
    <div className="dropdown">
      <div className="mobile__btn">
        <h3 className="dropdown__username">{user?.result?.username}</h3>
      </div>
      <button
        ref={dropdown_toggle_el}
        className="dropdown__toggle hide__toggle"
      >
        <Avatar
          className="dropdown__avatar hide__toggle"
          src={user?.result?.img}
          alt={user?.result?.username}
        />
      </button>

      {/* dropdown content */}
      <div ref={dropdown_content_el} className="dropdown__content">
        <Link to="/home" className="notification__link">
          <div className="notification-item">
            <AiOutlineHome className="dropdown__icon" />
            <span>Home</span>
          </div>
        </Link>

        {/* profile  */}
        <Link to="/profile" className="notification__link">
          <div className="notification-item">
            <AiOutlineUser />
            <span>Profile</span>
          </div>
        </Link>

        {/* logout */}
        <div className="notification__link" id="cursor">
          <div className="notification-item" onClick={handleLogout}>
            <MdLogout />
            <span>Log out</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
