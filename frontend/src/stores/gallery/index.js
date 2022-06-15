import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getImages } from "../../apis/test";

export const fetchImages = createAsyncThunk("gallery/fetchImages",
  async () => {
    const data = await getImages();
    return data;
  }
);


export const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    mode: "local",
    loading: false,
    images: [],
    displayedImages: [],
  },
  reducers: {
    setImages: (state, action) => {
      state.images = action.payload;
    },
    setDisplayedImages: (state, action) => {
      state.displayedImages = action.payload;
    },
    search: (state, action) => {
      const searchTerm = action.payload;
      state.displayedImages = state.images.filter((image) =>
        image.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchImages.fulfilled, (state, action) => {
      state.loading = false;
      const imgs = action.payload.map((imageURL, index) => {
        return {
          id: index,
          url: imageURL,
          label: "unlabeled",
          name: `image${index}`,
        }
      });
      state.images = imgs
      state.displayedImages = imgs;
    });

    builder.addCase(fetchImages.pending, (state) => {
      state.loading = true;
      state.images = [];
      state.displayedImages = [];
    });

    builder.addCase(fetchImages.rejected, (state) => {
      state.loading = false;
      state.images = [];
      state.displayedImages = [];
    });
  }
});

export const { setImages, setDisplayedImages, search } = gallerySlice.actions;
export default gallerySlice.reducer;