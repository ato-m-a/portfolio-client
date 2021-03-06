import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import persistStore from 'redux-persist/lib/persistStore';

/* reducers */
import userReducer from './reducers/users';
import terminalReducer from './reducers/terminal';
import themeReducer from './reducers/theme';

/* noop storage */
const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    }
  }
}

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const reducers = combineReducers({
  user: userReducer,
  terminal: terminalReducer,
  theme: themeReducer
});

const persistedReducer = persistReducer({
  key: 'root',
  storage,
  version: 1,
  whitelist: ['user', 'terminal', 'theme']
}, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
});

setupListeners(store.dispatch);

export const persistor = persistStore(store, {}, () => {
  persistor.persist();
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;