import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import postsReducer from './features/posts/postsSlice'
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'

// const persistConfig = {
//   key: 'root',
//   version: 1,
//   storage,
//   whitelist: ['user'],
// }

export const store = configureStore({
  reducer: {
    // user: persistReducer(persistConfig, userReducer),
    user: userReducer,
    posts: postsReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }),
})

// export const persistor = persistStore(store)
