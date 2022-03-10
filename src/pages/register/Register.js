import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { selectToggle, toggleActive } from "../../features/navSlice";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import { register } from "../../features/authSlice";
import { ThreeDots } from "react-loader-spinner";
import FileBase from "react-file-base64";
import { SEO } from "../../components";

const initialState = {
  username: "",
  email: "",
  password: "",
  img: "",
};

function Register() {
  const show = useSelector(selectToggle);
  const dispatch = useDispatch();
  const history = useHistory();
  const toggle = () => {
    dispatch(toggleActive());
  };

  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { username, email, img, password } = formValue;
  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  //form submit

  const handleSubmit = (e) => {
    e.preventDefault();

    if ((username && email && password, img)) {
      dispatch(register({ formValue, history }));
    }
  };

  //handle input
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <React.Fragment>
      <SEO title="Join Shortly" />
      <div className="contact">
        <h1 className="intro__title" style={{ color: "white" }}>
          Register
        </h1>
        <form className="form__box" onSubmit={handleSubmit}>
          <div className="form__input">
            <input
              className="shorten__inp"
              name="username"
              required
              placeholder="e.g Wizkid"
              value={username}
              onChange={onInputChange}
            />
          </div>
          <div className="form__input">
            <input
              className="shorten__inp"
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={onInputChange}
            />
          </div>
          <div className="form__input">
            <input
              className="shorten__inp"
              type={show ? "text" : "password"}
              required
              name="password"
              placeholder="Enter your Password"
              value={password}
              onChange={onInputChange}
            />
            {show ? (
              <AiOutlineEye className="login__icon" onClick={toggle} />
            ) : (
              <AiOutlineEyeInvisible className="login__icon" onClick={toggle} />
            )}
          </div>

          {/* <div className="form__input" style={{flexDirection:"column"}} > */}
          <div style={{ margin: "0 0 20px 0" }}>
            <label style={{ margin: "0 0 30px 0" }}>
              Add a Profile Picture
            </label>
            <FileBase
              type="file"
              id="file"
              required
              multiple={false}
              onDone={({ base64 }) =>
                setFormValue({ ...formValue, img: base64 })
              }
            />
          </div>
          <button type="submit" className="action__btn">
            {loading && (
              <ThreeDots
                height="20"
                width="20"
                color="white"
                ariaLabel="loading"
              />
            )}
            <span style={{ marginLeft: "10px" }}> Join Shortly !</span>
          </button>
        </form>
        <p style={{ fontSize: "15px", fontWeight: "500" }}>
          Already have an account ? &nbsp;
          <Link
            to="/login"
            style={{ textDecoration: "underline", color: "#fff" }}
          >
            Login
          </Link>
        </p>
      </div>
    </React.Fragment>
  );
}

export default Register;
