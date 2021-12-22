import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppState } from '@/redux/store'

export interface AppearanceState {
  isDarkMode: boolean
}

const initialState: AppearanceState = {
  isDarkMode: false,
}

export const appearance = createSlice({
  name: 'appearance',
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload
    }
  },
})

export const { setDarkMode } = appearance.actions

export const selectDarkMode =
  (state: AppState) => state.appearance.isDarkMode

export default appearance.reducer
