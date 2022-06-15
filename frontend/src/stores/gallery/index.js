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
    statistics: {
      total: 0,
      unlabeled: 0,
      manual: 0,
      userChecked: 0,
      autoLabeled: 0,
    }
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
    },
    labelImage: (state, action) => {
      const { imageId, label } = action.payload;
      const image = state.images.find((image) => image.id === imageId);
      if (image) {
        image.label = label;
        // when it is the first time being labeled manually.
        if (!image.manual) {
          image.manual = true; 
          state.statistics.manual++;
          state.statistics.userChecked++;
          state.statistics.unlabeled--;
        }
      }
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
          canvas: null,
          manual: false
        }
      });
      state.images = imgs
      state.displayedImages = imgs;
      state.statistics.total = imgs.length;
      state.statistics.unlabeled = imgs.length;

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

export const { setImages, setDisplayedImages, search, labelImage } = gallerySlice.actions;
export default gallerySlice.reducer;