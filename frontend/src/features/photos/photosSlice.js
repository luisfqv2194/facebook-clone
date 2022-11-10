import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
export const photoSlice = createSlice({
  name: 'photos',
  initialState: { photos: [], loading: true, error: '' },
  reducers: {
    photos_request: (state, action) => {
      return { ...state }
    },
    photos_success: (state, action) => {
      return {
        ...state,
        photos: action.payload,
        loading: false,
        error: '',
      }
    },
    photos_error: (state, action) => {
      return { ...state, loading: false, error: action.payload }
    },
  },
})

export const selectPhotos = (state) => state.photos.value

export default photoSlice.reducer
