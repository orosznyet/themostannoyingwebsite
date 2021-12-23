import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppState } from '@/redux/store'

export interface RuntimeState {
  startTime: Date
  inFocusSeconds: number
  modalCounter: number
  hasInteracted: boolean
}

const initialState: RuntimeState = {
  startTime: new Date(),
  inFocusSeconds: 0,
  modalCounter: 0,
  hasInteracted: false,
}

/**
 * Runtime stores everyting that won't get persisted. This also includes some
 * non-persional statistics.
 */
export const runtime = createSlice({
  name: 'runtime',
  initialState,
  reducers: {
    setModalCounter: (state, action: PayloadAction<number>) => {
      state.modalCounter = action.payload
    },
    incrementModalCounter: (state) => {
      state.modalCounter = state.modalCounter + 1
    },
    decreaseModalCounter: (state) => {
      state.modalCounter = state.modalCounter - 1
    },
    setHasInteracted: (state) => {
      state.hasInteracted = true
    },
    setInFocusSeconds: (state, action: PayloadAction<number>) => {
      state.inFocusSeconds = action.payload
    }
  },
})

export const {
  setModalCounter,
  incrementModalCounter,
  decreaseModalCounter,
  setHasInteracted,
  setInFocusSeconds,
} = runtime.actions

export const selectStartTime =
  (state: AppState) => state.runtime.startTime
export const selectModalCounter =
  (state: AppState) => state.runtime.modalCounter
export const selectHasInteracted =
  (state: AppState) => state.runtime.hasInteracted
export const selectInFocusSeconds =
  (state: AppState) => state.runtime.inFocusSeconds

export default runtime.reducer
