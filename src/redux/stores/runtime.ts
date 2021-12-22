import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppState } from '@/app/store'

export interface RuntimeState {
  modalCounter: number
  hasInteracted: boolean
}

const initialState: RuntimeState = {
  modalCounter: 0,
  hasInteracted: false,
}

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
    }
  },
})

export const {
  setModalCounter,
  incrementModalCounter,
  decreaseModalCounter,
  setHasInteracted,
} = runtime.actions

export const selectModalCounter =
  (state: AppState) => state.runtime.modalCounter
export const selectHasInteracted =
  (state: AppState) => state.runtime.hasInteracted

export default runtime.reducer
