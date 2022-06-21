import { configureStore } from '@reduxjs/toolkit';
import galleryReducer from "./gallery";

export default configureStore({
  reducer: {
    gallery: galleryReducer,
  }
});