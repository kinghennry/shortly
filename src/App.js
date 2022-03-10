import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Home, User, Login, Register, Profile } from "./pages";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./features/authSlice";
function App() {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const account = JSON.parse(localStorage.getItem("profile"));
  React.useEffect(() => {
    dispatch(setUser(account));
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact path="/">
          {user ? <Redirect to="/home" /> : <Home />}
        </Route>
        <Route exact path="/login">
          {user ? <Redirect to="/home" /> : <Login />}
        </Route>
        <Route exact path="/home">
          {user ? <User /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/register">
          {user ? <Redirect to="/home" /> : <Register />}
        </Route>
        <Route exact path="/profile">
          {user ? <Profile /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
