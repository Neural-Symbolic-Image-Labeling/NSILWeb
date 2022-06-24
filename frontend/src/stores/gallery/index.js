import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { autoLogin } from "../../apis/workspace";

export const fetchWorkspace = createAsyncThunk("gallery/fetchWorkspace",
  async () => {
    const data = await autoLogin();
    return data;
  }
);


export const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    currCollectionId: null,
    loading: true,
    filter: "",
    authed: false,
    /**@type {import ('../../../../models/Workspace/response').IWorkspaceResponse}*/
    workspace: null
  },
  reducers: {
    setWorkspace: (state, action) => { 
      state.workspace = action.payload;
      state.currCollectionId = action.payload.collections[0]._id;
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
    labelImage: (state, action) => {
      const { imageId, labels } = action.payload;
      // find collection
      const collection = state.workspace.collections.find(c => c._id.toString() === state.currCollectionId.toString());
      // find image
      const image = collection.images.find((image) => image.imageId.toString() === imageId.toString());
      if (image) {
        // auto labelled before
        if (image.labels.length > 0 && !image.manual) {
          collection.statistics.autoLabeled--;
        }
        image.labels = labels;
        // when it is the first time being labeled manually.
        if (!image.manual) {
          image.manual = true; 
          collection.statistics.manual++;
          collection.statistics.userChecked++;
          collection.statistics.unlabeled--;
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWorkspace.fulfilled, (state, action) => {
      state.loading = false;
      state.workspace = action.payload;
      state.currCollectionId = action.payload.collections[0]._id;
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

export const { setLoading, setWorkspace, setAuthed, setFilter, labelImage } = gallerySlice.actions;
export default gallerySlice.reducer;