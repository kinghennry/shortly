import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { SEO } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { selectToggle, toggleActive } from "../../features/navSlice";
import { login } from "../../features/authSlice";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import "./index.css";

const initialState = {
  username: "",
  password: "",
};

function Login() {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { username, password } = formValue;
  const show = useSelector(selectToggle);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    error && toast.error(error);
  }, [error]);
  const toggle = () => {
    dispatch(toggleActive());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      dispatch(login({ formValue, history }));
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <React.Fragment>
      <SEO title="Shortly || Login" />
      <div className="contact">
        <h1 className="intro__title" style={{ color: "white" }}>
          Login
        </h1>
        <form className="form__box" onSubmit={handleSubmit}>
          <div className="form__input">
            <input
              type="text"
              className="shorten__inp"
              name="username"
              required
              placeholder="e.g JSXYoungboy"
              value={username}
              onChange={onInputChange}
            />
          </div>
          <div className="form__input">
            <input
              className="shorten__inp"
              type={show ? "text" : "password"}
              name="password"
              required
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

          <div>
            <button type="submit" className="action__btn">
              {loading && (
                <ThreeDots
                  height="20"
                  width="20"
                  color="white"
                  ariaLabel="loading"
                />
              )}
              <span style={{ marginLeft: "10px" }}> Login !</span>
            </button>
          </div>
        </form>
        <p style={{ fontSize: "15px", fontWeight: "500" }}>
          Don't have an account ? &nbsp;
          <Link
            to="/register"
            style={{ textDecoration: "underline", color: "#fff" }}
          >
            Register
          </Link>
        </p>
      </div>
    </React.Fragment>
  );
}

export default Login;
