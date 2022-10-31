import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  loading: false
};

export const artworkFormSlice = createSlice({
  name: 'artworkForm',
  initialState,
  reducers: {
    setArtworkFormLoading: (state, action) => {
      state.loading = action.payload.loading;
    }
  }
});

export const { setArtworkFormLoading } = artworkFormSlice.actions;
export default artworkFormSlice.reducer;