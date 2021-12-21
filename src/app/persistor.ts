import { createStore } from 'redux'
import { persistStore, persistReducer, PersistConfig } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { rootReducer } from './store'

const persistedReducer = persistReducer({
  version: 1,
  key: 'root',
  storage,
  whitelist: ['appearance', 'consent'],
  debug: true,
}, rootReducer)

const store = createStore(persistedReducer)
const persistor = persistStore(store)

export default { store, persistor }
