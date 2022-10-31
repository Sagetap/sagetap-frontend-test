import { Artwork } from './../constants/artworks';
import { ARTWORKS_LIST } from '../constants/artworks';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  artworks: ARTWORKS_LIST,
  loading: false
};

export const artworksSlice = createSlice({
  name: 'artworks',
  initialState,
  reducers: {
    /**
     * @desc Set/update values of artwork
     * @param state 
     * @param action { artwork: Artwork }
     */
    setArtwork: (state, action: PayloadAction<{ artwork: Artwork }>) => {
      const { artwork } = action.payload;
      const isArtworkInStore = state.artworks.filter(art => art.id === artwork.id).length;
      if (isArtworkInStore) {
        state.artworks = state.artworks.map(art => {
          if( art.id === artwork.id ) {
            Object.assign(art, artwork);
          }
          return art;
        });
      } else {
        state.artworks = [...state.artworks, artwork];
      }
    },
    /**
     * @desc Retrieve artwork data from API
     * @param state 
     * @param action
     */
    getArtworkData: (state, action: PayloadAction<{ id: number }>) => {
      // Handled in saga
    },
    setArtworkLoading: (state, action: PayloadAction<{ id: number, loading: boolean }>) => {
      const { id, loading } = action.payload;
      state.artworks = state.artworks.map(art => {
        if (art.id === id) {
          art.loading = loading;
        }
        return art;
      });
    },
    /**
     * @desc Remove artwork object from list of artworks
     * @param state 
     * @param action { id: number }
     */
    removeArtwork: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      state.artworks = state.artworks.filter(art => art.id !== id);
    },
    postArtworkRating: (state, action: PayloadAction<{ id: number, rating: number }>) => {
      // Handled in saga
    },
    /**
     * @desc Called after rating has been posted successfully
     * @param state 
     * @param action 
     */
    postArtworkRatingSuccess: (state, action: PayloadAction<{ id: number, rating: number }>) => {
      const { id, rating } = action.payload;
      state.artworks = state.artworks.map((art) => {
        if (id === art.id) {
          art.newRating = String(rating);
        }
        return art;
      })
    },
  }
});

export const { 
  removeArtwork, 
  setArtworkLoading, 
  setArtwork, 
  getArtworkData, 
  postArtworkRating, 
  postArtworkRatingSuccess 
} = artworksSlice.actions;
export default artworksSlice.reducer;