import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import movieReducer from "./../features/moviesSlice";
export const store = configureStore({
  reducer: {
    movies: movieReducer,
    user: userReducer,
  },
});
