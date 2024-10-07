import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import projectsSlice from './features/projects/projectsSlice';
import timerSlice from './features/Timer/timerSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['projects'],
};

const rootReducer = combineReducers({
  projects: projectsSlice,
  timer: timerSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
