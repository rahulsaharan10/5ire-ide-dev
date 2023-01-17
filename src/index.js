/* global chrome */

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Store } from "webext-redux";
import { CONNECTION_NAME, PORT_NAME } from "./Constants";

chrome.runtime.connect({ name: CONNECTION_NAME });
const initApp = () => {
  const store = new Store({ portName: PORT_NAME });

  const root = ReactDOM.createRoot(document.getElementById("root"));

  //fix for redux v8 in webext
  Object.assign(store, {
    dispatch: store.dispatch.bind(store),
    getState: store.getState.bind(store),
    subscribe: store.subscribe.bind(store),
  });

  store.ready().then(() => {
    // The store implements the same interface as Redux's store
    // so you can use tools like `react-redux` no problem!
    root.render(
      <Provider store={store}>
        <MemoryRouter>
          {/* <React.StrictMode> */}
          <App />
          {/* </React.StrictMode> */}
        </MemoryRouter>
      </Provider>
    );
  });

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
};

// Listens for when the store gets initialized
chrome.runtime.onMessage.addListener((req) => {
  if (req.type === "STORE_INITIALIZED") {
    // Initializes the popup logic
    initApp();
  }
});
