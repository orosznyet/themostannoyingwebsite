import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppState } from '@/redux/store'

export interface ConsentState {
  reviewCompleted: boolean
  enableCookies: boolean
  enableAnalytics: boolean
  enableSound: boolean
  enableFlashing: boolean
  adultFilter: boolean
}

const initialState: ConsentState = {
  reviewCompleted: false,
  enableCookies: true,
  enableAnalytics: true,
  enableSound: true,
  enableFlashing: false,
  adultFilter: true,
}

export const consent = createSlice({
  name: 'consent',
  initialState,
  reducers: {
    setReviewCompleted: (state, action: PayloadAction<boolean>) => {
      state.reviewCompleted = action.payload
    },
    setEnableCookies: (state, action: PayloadAction<boolean>) => {
      state.enableCookies = action.payload
    },
    setEnableAnalytics: (state, action: PayloadAction<boolean>) => {
      state.enableAnalytics = action.payload
    },
    setEnableSound: (state, action: PayloadAction<boolean>) => {
      state.enableSound = action.payload
    },
    setEnableFlashing: (state, action: PayloadAction<boolean>) => {
      state.enableFlashing = action.payload
    },
    setAdultFilter: (state, action: PayloadAction<boolean>) => {
      state.adultFilter = action.payload
    }
  },
})

export const {
  setReviewCompleted,
  setEnableCookies,
  setEnableAnalytics,
  setEnableSound,
  setEnableFlashing,
  setAdultFilter
} = consent.actions

export const selectReviewCompleted =
  (state: AppState) => state.consent.reviewCompleted
export const selectEnableCookies =
  (state: AppState) => state.consent.enableCookies
export const selectEnableAnalytics =
  (state: AppState) => state.consent.enableAnalytics
export const selectEnableSound =
  (state: AppState) => state.consent.enableSound
export const selectEnableFlashing =
  (state: AppState) => state.consent.enableFlashing
export const selectAdultFilter =
  (state: AppState) => state.consent.adultFilter

export default consent.reducer
