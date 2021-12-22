import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppState } from '@/app/store'

export interface AppearanceState {
  isDarkMode: boolean
  allowFlashing: boolean
}

const initialState: AppearanceState = {
  isDarkMode: false,
  allowFlashing: false,
}

export const appearance = createSlice({
  name: 'appearance',
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload
    },
    setAllowFlashing: (state, action: PayloadAction<boolean>) => {
      state.allowFlashing = action.payload
    }
  },
})

export const { setDarkMode, setAllowFlashing } = appearance.actions

export const selectDarkMode =
  (state: AppState) => state.appearance.isDarkMode
export const selectAllowFlashing =
  (state: AppState) => state.appearance.allowFlashing

export default appearance.reducer
