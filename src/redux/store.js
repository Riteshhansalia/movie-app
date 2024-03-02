import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../redux/movies/movieSlice";

export const store = configureStore({
  reducer: movieReducer,
});
