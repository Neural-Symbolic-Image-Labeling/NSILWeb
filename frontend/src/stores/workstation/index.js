import { Brush, PieChart } from "@mui/icons-material";
import { ResultTab } from "../../views/HomePage/SideBar/ResultTab";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Box } from "@mui/system";

export const WorkstationSlice = createSlice({
  name: "workstation",
  initialState: {
    page: 0, // switch between gallery and annoatation canvas
    sideBar: {
      isSideBarOpen: true,
      tabNumber: 0,
      tabs: [
        {
          label: "Results",
          icon: <PieChart />,
          value: 0,
          disabled: false,
          jsx: <ResultTab />
        },
        {
          label: "Tools",
          icon: <Brush />,
          value: 1,
          disabled: false,
          jsx: <Box>222</Box>
        },
      ]
    },
  },
  reducers: {
    setPage: (state, action) => { 
      state.page = action.payload;
    },
    setIsSideBarOpen: (state, action) => { 
      state.sideBar.isSideBarOpen = action.payload;
   },
    setTabNumber: (state, action) => { 
      state.sideBar.tabNumber = action.payload;
    },
    setTabDisability: (state, action) => { 
      const { tabNumber, disabled } = action.payload;
      state.sideBar.tabs[tabNumber].disabled = disabled;
    }
  }
});

export const {setPage, setIsSideBarOpen, setTabNumber, setTabDisability } = WorkstationSlice.actions;
export default WorkstationSlice.reducer; 

