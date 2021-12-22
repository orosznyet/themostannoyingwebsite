import { createStore } from 'redux'
import { persistStore, persistReducer, PersistConfig } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { rootReducer } from './store'

const persistedReducer = persistReducer({
  version: 1,
  key: 'root',
  storage,
  blacklist: ['runtime'],
  debug: true,
}, rootReducer)

const store = createStore(persistedReducer)
const persistor = persistStore(store)

export type PersistedStoreType = typeof store

export default { store, persistor }
