import { configureStore } from '@reduxjs/toolkit';
import galleryReducer from "./gallery";
import workstationReducer from "./workstation";

export default configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredPaths: ['workstation.sideBar.tabs']
    }
  }),
  reducer: {
    gallery: galleryReducer,
    workstation: workstationReducer
  }
});