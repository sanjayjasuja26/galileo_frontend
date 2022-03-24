import storage from 'redux-persist/lib/storage'
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk';
import rootReducer from './reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
}
  
const persistedReducer = persistReducer(persistConfig, rootReducer)

export let store = createStore(persistedReducer, applyMiddleware(thunk))
export let persistor = persistStore(store)
