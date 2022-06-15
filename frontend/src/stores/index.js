import { configureStore } from '@reduxjs/toolkit';
import controllerReducer from "./controller";
import galleryReducer from "./gallery";
import ruleReducer from "./rules";

export default configureStore({
  reducer: {
    controller: controllerReducer,
    gallery: galleryReducer,
    rules: ruleReducer,
  }
});