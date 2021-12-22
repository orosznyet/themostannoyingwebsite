import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppState } from '@/app/store'

export interface ConsentState {
  reviewCompleted: boolean
  enableCookies: boolean
  enableAnalytics: boolean
  adultFilter: boolean
}

const initialState: ConsentState = {
  reviewCompleted: false,
  enableCookies: true,
  enableAnalytics: true,
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
    setAdultFilter: (state, action: PayloadAction<boolean>) => {
      state.adultFilter = action.payload
    }
  },
})

export const {
  setReviewCompleted,
  setEnableCookies,
  setEnableAnalytics,
  setAdultFilter
} = consent.actions

export const selectReviewCompleted =
  (state: AppState) => state.consent.reviewCompleted
export const selectEnableCookies =
  (state: AppState) => state.consent.enableCookies
export const selectEnableAnalytics =
  (state: AppState) => state.consent.enableAnalytics
export const selectAdultFilter =
  (state: AppState) => state.consent.adultFilter

export default consent.reducer
