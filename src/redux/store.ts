import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit'
import preferenceReducer from '@/redux/stores/preference'
import consentReducer from '@/redux/stores/consent'
import experienceReducer from '@/redux/stores/experience'
import runtimeReducer from '@/redux/stores/runtime'

export const rootReducer = combineReducers({
  preference: preferenceReducer,
  consent: consentReducer,
  experience: experienceReducer,
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
