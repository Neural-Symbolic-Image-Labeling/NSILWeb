import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const WorkstationSlice = createSlice({
  name: "workstation",
  initialState: {
    page: 0, // switch between gallery and annoatation canvas
    currentImage : 0,
    currentTool: "text",
    currentLabels: "",
    currentInput:"",
    manual: false,
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
    },
    setCurrentLabels:(state, action) => {
      state.currentLabels= action.payload;
    },
    setCurrentInput:(state, action) => {
      state.currentInput= action.payload;
    },
    setManual:(state, action) => {
      state.manual= action.payload;
    }
  }
});

export const {
  setPage,
  setCurrentImage,
  setCurrentTool,
  setCurrentLabels,
  setManual,
  setCurrentInput,
} = WorkstationSlice.actions;

export default WorkstationSlice.reducer; 

