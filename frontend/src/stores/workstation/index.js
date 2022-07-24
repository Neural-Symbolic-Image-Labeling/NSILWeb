import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const WorkstationSlice = createSlice({
  name: "workstation",
  initialState: {
    page: 0, // switch between gallery and annoatation canvas
    currentImage : 0,
  },
  reducers: {
    setPage: (state, action) => { 
      state.page = action.payload;
    },
    setCurrentImage: (state, action) => { 
      state.currentImage= action.payload;
    }
  }
});

export const {
  setPage,
  setCurrentImage,
} = WorkstationSlice.actions;

export default WorkstationSlice.reducer; 

