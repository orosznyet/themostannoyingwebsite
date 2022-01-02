import { ThunkAction, Action, combineReducers, createStore } from '@reduxjs/toolkit'
import preferenceReducer from '@/redux/stores/preference'
import consentReducer from '@/redux/stores/consent'
import storage from 'redux-persist/lib/storage'
import experienceReducer from '@/redux/stores/experience'
import runtimeReducer from '@/redux/stores/runtime'
import { PersistConfig, persistReducer, persistStore } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

export const rootReducer = combineReducers({
  preference: preferenceReducer,
  consent: consentReducer,
  experience: experienceReducer,
  runtime: runtimeReducer,
})

const persistConfig: PersistConfig<RootState> = {
  version: 1,
  key: 'root',
  storage,
  whitelist: ['consent', 'experience', 'preference'],
  blacklist: ['runtime'],
  debug: process.env.NODE_ENV !== 'production',
  stateReconciler: autoMergeLevel2,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer)
const persistor = persistStore(store)

export type PersistedStoreType = typeof store
export type RootState = ReturnType<typeof rootReducer>
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default { store, persistor }
