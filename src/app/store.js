import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import navReducer from "../features/navSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    nav: navReducer,
  },
});
