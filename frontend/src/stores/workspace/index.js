import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { autoLogin, login } from "../../apis/workspace";

export const fetchWorkspace = createAsyncThunk("gallery/fetchWorkspace",
  async () => {
    const data = await autoLogin();
    return data;
  }
);

export const loadWorkspace = createAsyncThunk("gallery/loadWorkspace",
  async (workspaceName) => { 
    const data = await login(workspaceName);
    return data;
  }
);


export const workspcaeSlice = createSlice({
  name: "workspace",
  initialState: {
    currCollectionId: null,
    currImageId: null,
    loading: true,
    filter: "",
    authed: false,
    /**@type {import ('../../../../models/Workspace/response').IWorkspaceResponse}*/
    workspace: null
  },
  reducers: {
    setWorkspace: (state, action) => { 
      if(!state.workspace || state.workspace._id !== action.payload._id) state.currCollectionId = action.payload.collections[0]._id;
      state.workspace = action.payload;
    },
    setRule: (state, action) => { 
      const { ruleIndex, rule } = action.payload;
      const collection = state.workspace.collections.find(c => c._id.toString() === state.currCollectionId.toString());
      collection.rules[ruleIndex] = rule;
    },
    setCurrImageId: (state, action) => { 
      state.currImageId = action.payload;
    },
    setStatistics: (state, action) => { 
      const statistics = action.payload;
      const collection = state.workspace.collections.find(c => c._id.toString() === state.currCollectionId.toString());
      collection.statistics = statistics;
    },
    setCurrCollectionId: (state, action) => { 
      state.currCollectionId = action.payload;
    },
    setAuthed: (state, action) => { 
      state.authed = action.payload;
    },
    setFilter: (state, action) => { 
      state.filter = action.payload;
    },
    setLoading: (state, action) => { 
      state.loading = action.payload;
    },
    setImageMetaData: (state, action) => {
      const { indexI, data } = action.payload;
      // find collection
      const collection = state.workspace.collections.find(c => c._id.toString() === state.currCollectionId.toString());
      // update image
      collection.images[indexI] = data;
    },
  },
  extraReducers: (builder) => {
    // #region fetchWorkspace
    builder.addCase(fetchWorkspace.fulfilled, (state, action) => {
      if(!state.workspace || state.workspace._id !== action.payload._id) state.currCollectionId = action.payload.collections[0]._id;
      state.workspace = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchWorkspace.pending, (state) => {
      state.loading = true;
      state.workspace = null;
    });

    builder.addCase(fetchWorkspace.rejected, (state) => {
      state.loading = false;
      state.workspace = null;
    });
    // #endregion

    // #region loadWorkspace
    builder.addCase(loadWorkspace.fulfilled, (state, action) => {
      if(!state.workspace || state.workspace._id !== action.payload._id) state.currCollectionId = action.payload.collections[0]._id;
      state.workspace = action.payload;
      state.loading = false;
    });

    builder.addCase(loadWorkspace.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadWorkspace.rejected, (state) => {
      state.loading = false;
    });
    // #endregion
  }
});

export const {
  setLoading,
  setRule,
  setWorkspace,
  setCurrImageId,
  setStatistics,
  setCurrCollectionId,
  setAuthed,
  setFilter,
  setImageMetaData
} = workspcaeSlice.actions;
export default workspcaeSlice.reducer;