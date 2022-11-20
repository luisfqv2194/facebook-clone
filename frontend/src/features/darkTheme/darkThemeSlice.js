import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
export const darkThemeSlice = createSlice({
  name: 'darkTheme',
  initialState: Cookies.get('darkTheme')
    ? JSON.parse(Cookies.get('darkTheme'))
    : false,
  reducers: {
    dark: (state, action) => {
      return true
    },
    light: (state, action) => {
      return false
    },
  },
})

export const selectDarkTheme = (state) => state.darkTheme.value

export default darkThemeSlice.reducer
