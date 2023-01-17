/* global chrome */

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./reducer/counter";
import logger from "redux-logger";

const rootReducer = combineReducers({
  counter: counterReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [logger],
});

export default store;
