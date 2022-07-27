import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const WorkstationSlice = createSlice({
  name: "workstation",
  initialState: {
    page: 1, // switch between gallery and annoatation canvas
    currentImage : 0,
    currentTool: "null"
  },
  reducers: {
    setPage: (state, action) => { 
      state.page = action.payload;
    },
    setCurrentImage: (state, action) => { 
      state.currentImage= action.payload;
    },
    setCurrentTool:(state, action) => {
      state.currentTool= action.payload;
    }
  }
});

export const {
  setPage,
  setCurrentImage,
  setCurrentTool
} = WorkstationSlice.actions;

export default WorkstationSlice.reducer; 

