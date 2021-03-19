import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import Auth from './auth';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, Auth);

const store = createStore(
    persistedReducer,
    applyMiddleware()
)

const persistor = persistStore(store);

export { store, persistor }