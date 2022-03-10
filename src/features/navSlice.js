import { createSlice } from "@reduxjs/toolkit";

const navSlice = createSlice({
  name: "nav",
  initialState: {
    toggle: false,
    openMenu: false,
  },
  reducers: {
    toggleActive: (state) => {
      state.toggle = !state.toggle;
    },
    menuActive: (state) => {
      state.openMenu = !state.openMenu;
    },
  },
});

export const selectToggle = (state) => state.nav.toggle;
export const selectMenu = (state) => state.nav.openMenu;

export const { toggleActive, menuActive } = navSlice.actions;

export default navSlice.reducer;
