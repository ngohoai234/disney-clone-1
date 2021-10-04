import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import movieSlice from "../features/movieSlice";
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    movie: movieSlice.reducer,
  },
});
