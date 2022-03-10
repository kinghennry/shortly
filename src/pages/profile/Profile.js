import React, { useState } from "react";
import { Navbar, Footer } from "../../components";
import { Avatar } from "@material-ui/core";
import { MdPublish } from "react-icons/md";
import "./settings.css";
import FileBase from "react-file-base64";
import { useSelector } from "react-redux";
import {
  AiOutlineMail,
  AiOutlineUser,
  AiOutlineClockCircle,
} from "react-icons/ai";
import { format } from "timeago.js";
import { SEO } from "../../components";
function Profile() {
  const { user } = useSelector((state) => ({ ...state.auth }));
  React.useEffect(() => {
    document.title = `Profile || ${user?.result?.username.toLocaleUpperCase()}`;
  }, [user]);
  const [updateUser, setUpdateUser] = useState({
    username: user?.result?.username,
    email: user?.result?.email,
    img: user?.result?.img,
  });
  return (
    <React.Fragment>
      <SEO title="Shortly || Profile" />
      <Navbar />
      <article className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">Edit User</h1>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <Avatar
                className="dropdown__avatar"
                src={user?.result?.img}
                alt={user?.result?.username}
              />
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <AiOutlineUser
                  className="userShowIcon"
                  style={{ fontSize: "18px" }}
                />
                <span className="userShowInfoTitle">
                  {user?.result?.username}
                </span>
              </div>
              {/* created at */}
              <span className="userShowTitle">Created:</span>
              <div className="userShowInfo">
                <AiOutlineClockCircle
                  className="userShowIcon"
                  style={{ fontSize: "18px" }}
                />
                <span className="userShowInfoTitle">
                  {format(user?.result?.createdAt)}
                </span>
              </div>
              {/* email */}
              <span className="userShowTitle">Contact Details</span>

              <div className="userShowInfo">
                <AiOutlineMail className="userShowIcon" />
                <span className="userShowInfoTitle">{user?.result?.email}</span>
              </div>
            </div>
          </div>

          {/* edit */}
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    type="text"
                    value={updateUser.username}
                    className="userUpdateInput"
                    onChange={(e) =>
                      setUpdateUser({ ...updateUser, username: e.target.value })
                    }
                  />
                </div>

                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="email"
                    value={updateUser.email}
                    onChange={(e) =>
                      setUpdateUser({ ...updateUser, email: e.target.value })
                    }
                    className="userUpdateInput"
                  />
                </div>
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img
                    className="userUpdateImg"
                    src={user?.result?.img}
                    alt="user__bg"
                  />
                  <label htmlFor="file">
                    <MdPublish className="userUpdateIcon" />
                  </label>
                  <FileBase
                    type="file"
                    id="file"
                    required
                    multiple={false}
                    onDone={({ base64 }) =>
                      setUpdateUser({ ...updateUser, img: base64 })
                    }
                  />
                </div>
                <button
                  disabled={updateUser.username || updateUser.email}
                  className="userUpdateButton"
                >
                  Update! (Coming Soon)
                </button>
              </div>
            </form>
          </div>
        </div>
      </article>
      <Footer />
    </React.Fragment>
  );
}

export default Profile;
