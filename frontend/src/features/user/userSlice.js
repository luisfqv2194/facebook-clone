import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    login: (state, action) => {
      return action.payload
    },
  },
})

export const { login } = userSlice.actions

export const selectUser = (state) => state.user.value

export default userSlice.reducer
