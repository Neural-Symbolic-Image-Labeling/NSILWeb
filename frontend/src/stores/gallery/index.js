import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { autoLogin } from "../../apis/test";

export const fetchWorkspace = createAsyncThunk("gallery/fetchWorkspace",
  async () => {
    const data = await autoLogin();
    return data;
  }
);


export const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    mode: "local",
    loading: true,
    filter: "",
    /**@type {import ('../../../../models/Workspace/response').IWorkspaceResponse}*/
    workspace: null
  },
  reducers: {
    setWorkspace: (state, action) => { 
      state.workspace = action.payload;
    },
    setFilter: (state, action) => { 
      state.filter = action.payload;
    },
    setLoading: (state, action) => { 
      state.loading = action.payload;
    },
    labelImage: (state, action) => {

      const { imageId, label } = action.payload;
      const image = state.workspace.images.find((image) => image.imageId.toString() === imageId.toString());
      if (image) {
        image.label = label;
        // when it is the first time being labeled manually.
        if (!image.manual) {
          image.manual = true; 
          state.workspace.statistics.manual++;
          state.workspace.statistics.userChecked++;
          state.workspace.statistics.unlabeled--;
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWorkspace.fulfilled, (state, action) => {
      state.loading = false;
      state.workspace = action.payload;
    });

    builder.addCase(fetchWorkspace.pending, (state) => {
      state.loading = true;
      state.workspace = null;
    });

    builder.addCase(fetchWorkspace.rejected, (state) => {
      state.loading = false;
      state.workspace = null;
    });
  }
});

export const { setLoading, setWorkspace, setFilter, labelImage } = gallerySlice.actions;
export default gallerySlice.reducer;