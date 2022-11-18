import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
export const friendsSlice = createSlice({
  name: 'friends',
  initialState: { friends: [], loading: true, error: '' },
  reducers: {
    friends_request: (state, action) => {
      return { ...state }
    },
    friends_success: (state, action) => {
      return {
        ...state,
        friends: action.payload,
        loading: false,
        error: '',
      }
    },
    friends_error: (state, action) => {
      return { ...state, loading: false, error: action.payload }
    },
  },
})

export const selectFriends = (state) => state.friends.value

export default friendsSlice.reducer
