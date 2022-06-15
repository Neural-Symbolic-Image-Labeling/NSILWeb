import { createSlice } from '@reduxjs/toolkit';

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
    }
});

export const { setStatistics } = controllerSlice.actions;
export default controllerSlice.reducer;