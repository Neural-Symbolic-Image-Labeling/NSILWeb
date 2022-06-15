import { createSlice } from '@reduxjs/toolkit';
import { labelImage } from '../gallery';

export const controllerSlice = createSlice({
  name: "controller",
  initialState: {
    statistics: {
      total: 0,
      unlabeled: 0,
      manual: 0,
      userChecked: 0,
      autoLabeled: 0,
    }
  },
  reducers: {
    setStatistics: (state, action) => {
      state.statistics = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(labelImage, (state) => {
      state.statistics.manual++;
      state.statistics.userChecked++;
    })
  }
});

export const { setStatistics } = controllerSlice.actions;
export default controllerSlice.reducer;