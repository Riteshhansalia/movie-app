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

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowDetail",
  async (id) => {
    const response = await MovieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`);
    return response.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectMovieOrShow: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectMovieOrShow = {};
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
      })
      .addCase(fetchAsyncMovieOrShowDetail.fulfilled, (state, { payload }) => {
        console.log("movie Details Success");
        return { ...state, selectMovieOrShow: payload };
      });
  },
});

export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow;
export const { removeSelectedMovieOrShow } = movieSlice.actions;
export default movieSlice.reducer;
