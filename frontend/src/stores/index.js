import { configureStore } from '@reduxjs/toolkit';
import galleryReducer from "./gallery";
import workstationReducer from "./workstation";

export default configureStore({
  reducer: {
    gallery: galleryReducer,
    workstation: workstationReducer
  }
});