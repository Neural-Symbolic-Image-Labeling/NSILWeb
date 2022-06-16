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
    loading: true,
    images: [],
    filter: "",
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
    setFilter: (state, action) => { 
      state.filter = action.payload;
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
      state.statistics.total = imgs.length;
      state.statistics.unlabeled = imgs.length;

    });

    builder.addCase(fetchImages.pending, (state) => {
      state.loading = true;
      state.images = [];
      state.statistics = {
        total: 0,
        unlabeled: 0,
        manual: 0,
        userChecked: 0,
        autoLabeled: 0,
      };
    });

    builder.addCase(fetchImages.rejected, (state) => {
      state.loading = false;
      state.images = [];
    });
  }
});

export const { setImages, setFilter, labelImage } = gallerySlice.actions;
export default gallerySlice.reducer;