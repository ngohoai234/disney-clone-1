import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../api/api-movie";
import { API_KEY } from "./../api/movie-key";
export const fetchMovieById = createAsyncThunk(
  "movie/fetchMovieById",
  async (id) => {
    const response = await api.get(
      `/movie/${id}?api_key=${API_KEY}&language=en-US`
    );
    return response.data;
  }
);
