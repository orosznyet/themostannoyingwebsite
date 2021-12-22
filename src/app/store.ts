import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit'
import appearanceReducer from '@/features/appearance'
import consentReducer from '@/features/consent'
import runtimeReducer from '@/features/runtime'

export const rootReducer = combineReducers({
  appearance: appearanceReducer,
  consent: consentReducer,
  runtime: runtimeReducer,
})

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store
