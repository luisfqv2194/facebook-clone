import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
export const postSlice = createSlice({
  name: 'posts',
  initialState: { posts: [], loading: true, error: '' },
  reducers: {
    posts_request: (state, action) => {
      return { ...state }
    },
    posts_success: (state, action) => {
      return {
        ...state,
        posts: action.payload,
        loading: false,
        error: '',
      }
    },
    posts_error: (state, action) => {
      return { ...state, loading: false, error: action.payload }
    },
  },
})

export const selectPosts = (state) => state.posts.value

export default postSlice.reducer
