import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIKey } from "../../common/apis/MovieApiKey";
import MovieApi from "../../common/apis/MovieApi";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async () => {
    const movieText = "Harry";
    const response = await MovieApi.get(
      `?apiKey=${APIKey}&s=${movieText}&type=movie`
    );
    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  "shows/fetchAsyncShows",
  async () => {
    const seriesText = "Friends";
    const response = await MovieApi.get(
      `?apiKey=${APIKey}&s=${seriesText}&type=series`
    );
    return response.data;
  }
);
const initialState = {
  movies: {},
  shows: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovies: (state, { payload }) => {
      state.movies = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncMovies.pending, () => {
        console.log("Pending");
      })
      .addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
        console.log("Success");
        return { ...state, movies: payload };
      })
      .addCase(fetchAsyncMovies.rejected, () => {
        console.log("Rejected");
      })
      .addCase(fetchAsyncShows.fulfilled, (state, { payload }) => {
        console.log("Success");
        return { ...state, shows: payload };
      });
  },
});

export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const { addMovies } = movieSlice.actions;
export default movieSlice.reducer;
