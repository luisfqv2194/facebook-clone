import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
export const profileSlice = createSlice({
  name: 'profile',
  initialState: { profile: {}, loading: true, error: '' },
  reducers: {
    profile_request: (state, action) => {
      return { ...state }
    },
    profile_success: (state, action) => {
      return {
        ...state,
        profile: action.payload,
        loading: false,
        error: '',
      }
    },
    profile_error: (state, action) => {
      return { ...state, loading: false, error: action.payload }
    },
  },
})

export const selectProfile = (state) => state.profile.value

export default profileSlice.reducer
