import { createSlice } from "@reduxjs/toolkit";
import { fetchMovieById } from "./movieActions";
const initialState = {
  movie: {},
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMovieById.fulfilled]: (state, { payload }) => {
      state.movie = payload;
    },
  },
});

export const selectMovie = (state) => state.movie.movie;

export default movieSlice;
