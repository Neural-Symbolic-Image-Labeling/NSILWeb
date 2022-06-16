import { configureStore } from '@reduxjs/toolkit';
import controllerReducer from "./controller";
import galleryReducer from "./gallery";

export default configureStore({
  reducer: {
    controller: controllerReducer,
    gallery: galleryReducer,
  },
});