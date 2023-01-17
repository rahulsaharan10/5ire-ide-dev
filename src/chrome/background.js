/*global chrome a*/

import { wrapStore } from "webext-redux";
import { configureStore } from "@reduxjs/toolkit";
import counterReducer, {
  increment,
  initialState,
} from "../Store/reducer/counter";
import { CONNECTION_NAME, PORT_NAME } from "../Constants";
import logger from "redux-logger";
export {};

let isInitialized = false;

// chrome.storage.local.get("state", (storage) => {
//   const state = storage.state || initialState;
//   chrome.action.setBadgeText({ text: `${state.value}` });
// });

// Initializes the Redux store
const init = (preloadedState) => {
  const store = configureStore({
    reducer: counterReducer,
    preloadedState,
    middleware: [logger],
  });

  wrapStore(store, { portName: PORT_NAME });

  // Subscribes to the redux store changes. For each state
  // change, we want to store the new state to the storage.
  store.subscribe(() => {
    chrome.storage.local.set({ state: store.getState() });

    // Optional: other things we want to do on state change
    // Here we update the badge text with the counter value.
    chrome.action.setBadgeText({ text: `${store.getState().value}` });
  });
};

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === CONNECTION_NAME) {
    // The popup was opened.
    // Gets the current state from the storage.
    chrome.storage.local.get("state", (storage) => {
      if (!isInitialized) {
        // 1. Initializes the redux store and the message passing.
        init(storage.state || initialState);
        isInitialized = false;
      }
      // 2. Sends a message to notify that the store is ready.
      chrome.runtime.sendMessage({ type: "STORE_INITIALIZED" });
    });
  }
});

/** Fired when the extension is first installed,
 *  when the extension is updated to a new version,
 *  and when Chrome is updated to a new version. */
chrome.runtime.onInstalled.addListener((details) => {
  console.log("[background.js] onInstalled", details);
});

chrome.runtime.onStartup.addListener(() => {
  console.log("[background.js] onStartup");
});

chrome.runtime.onMessage.addListener(function (message, sender) {
  if (message.msg == "showPageAction") {
    let extensionURL = chrome.runtime.getURL("index.html");
    chrome.windows.create(
      {
        url: extensionURL + `?type=helloworld`,
        type: "popup",
        focused: true,
        width: 400,
        height: 700,
        top: 0,
        left: 800,
      },
      () => {
        console.log("Opened popup!");
      }
    );
  }
});
/**
 *  Sent to the event page just before it is unloaded.
 *  This gives the extension opportunity to do some clean up.
 *  Note that since the page is unloading,
 *  any asynchronous operations started while handling this event
 *  are not guaranteed to complete.
 *  If more activity for the event page occurs before it gets
 *  unloaded the onSuspendCanceled event will
 *  be sent and the page won't be unloaded. */
chrome.runtime.onSuspend.addListener(() => {
  console.log("[background.js] onSuspend");
});
