import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  email: null,
  photo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLogin(state, { payload }) {
      state.name = payload.name;
      state.email = payload.email;
      state.photo = payload.photo;
    },
    setUserLogout(state) {
      state.name = null;
      state.email = null;
      state.photo = null;
    },
  },
});

export const selectUserName = (state) => state.user.name;
export const selectUserEmail = (state) => state.user.email;
export const selectUserPhoto = (state) => state.user.photo;

export default userSlice;
