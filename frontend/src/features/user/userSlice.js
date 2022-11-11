import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
export const userSlice = createSlice({
  name: 'user',
  initialState: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
  reducers: {
    login: (state, action) => {
      return action.payload
    },
    logout: (state, action) => {
      return null
    },
    verify: (state, action) => {
      return { ...state, verified: action.payload }
    },
    update_picture: (state, action) => {
      return { ...state, picture: action.payload }
    },
  },
})

export const { login } = userSlice.actions

export const selectUser = (state) => state.user.value

export default userSlice.reducer
