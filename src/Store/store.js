/* global chrome */

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./reducer/counter";
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
import logger from "redux-logger";
// import storage from "redux-persist/lib/storage";
// import createChromeStorage from "redux-persist-chrome-storage";

// // Create a ChromeStorage instance using the chrome runtime and the Sync StorageArea.
// let ch;
// try {
//   ch = window.chrome;
// } catch (err) {
//   ch = chrome;
// }
// const storage = createChromeStorage(ch, "local");

// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
// };
const rootReducer = combineReducers({
  password: userSlice,
});

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: rootReducer,
  middleware: [logger],
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }).concat(logger),
});

// export const persistor = persistStore(store());

export default store;
