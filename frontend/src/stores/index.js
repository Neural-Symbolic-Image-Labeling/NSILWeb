import { configureStore } from '@reduxjs/toolkit';
import workspaceReducer from "./workspace";
import workstationReducer from "./workstation";

export default configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredPaths: ['workstation.sideBar.tabs']
    }
  }),
  reducer: {
    workspace: workspaceReducer,
    workstation: workstationReducer
  }
});