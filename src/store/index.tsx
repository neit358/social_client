import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './authSlice';
import sidebarReducer from './sidebarSlice';
import headerReducer from './headerSlice';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['sidebar', 'header'],
};

const rootReducer = combineReducers({
    auth: authReducer,
    sidebar: sidebarReducer,
    header: headerReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
