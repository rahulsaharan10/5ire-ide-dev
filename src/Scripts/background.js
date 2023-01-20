/*global chrome,browser,msBrowser a*/

import { wrapStore } from "webext-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer, { userState, setUIdata } from "../Store/reducer/auth";
import { CONNECTION_NAME, PORT_NAME } from "../Constants";
import logger from "redux-logger";

const browser = chrome?.runtime
  ? chrome
  : browser?.runtime
  ? browser
  : msBrowser;

let isInitialized = false;

// chrome.storage.local.get("state", (storage) => {
//   const state = storage.state || initialState;
//   chrome.action.setBadgeText({ text: `${state.value}` });
// });

let store;
// Initializes the Redux store
const init = (preloadedState) => {
  store = configureStore({
    reducer: { auth: authReducer },
    preloadedState,
    middleware: [logger],
  });

  wrapStore(store, { portName: PORT_NAME });

  // Subscribes to the redux store changes. For each state
  // change, we want to store the new state to the storage.
  store.subscribe(() => {
    browser.storage.local.set({ state: store.getState() });

    // Optional: other things we want to do on state change
    // Here we update the badge text with the counter value.
    //    browser.action.setBadgeText({ text: `${store.getState().counter?.value}` });
  });
};

browser.runtime.onConnect.addListener((port) => {
  if (port.name === CONNECTION_NAME) {
    // Gets the current state from the storage.
    browser.storage.local.get("state", (storage) => {
      if (!isInitialized) {
        // 1. Initializes the redux store and the message passing.
        init(storage.state || { auth: userState });
        isInitialized = false;
      }
      // 2. Sends a message to notify that the store is ready.
      browser.runtime.sendMessage({ type: "STORE_INITIALIZED" });
      console.log("PORT", port);
    });
  }

  port.onMessage.addListener(function (msg) {
    console.log("I am in background", port);
    if (port.name === "uiOps") {
      const idToQuery = msg.id;
      if (document.getElementById(idToQuery)) {
        port.postMessage({
          exists: true,
        });
      } else {
        port.postMessage({
          exists: false,
        });
      }
    }
  });
});

/** Fired when the extension is first installed,
 *  when the extension is updated to a new version,
 *  and when Chrome is updated to a new version. */
browser.runtime.onInstalled.addListener((details) => {
  console.log("[background.js] onInstalled", details);
});

browser.runtime.onStartup.addListener(() => {
  console.log("[background.js] onStartup");
});

browser.runtime.onMessage.addListener(function (message, sender) {
  if (message.msg == "showPageAction") {
    let extensionURL = browser.runtime.getURL("index.html");
    store.dispatch(setUIdata(message.data));
    browser.windows.create(
      {
        url: extensionURL + `?route=private-key`,
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
    console.log("HERE WE", browser.notifications.create);
    browser.notifications.create("", {
      iconUrl: browser.runtime.getURL("logo192.png"),
      message: "Your request to process data approved",
      title: "Opened 5ire Window",
      type: "basic",
    });
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
browser.runtime.onSuspend.addListener(() => {
  console.log("[background.js] onSuspend");
});

async function initScript() {
  try {
    await browser.scripting.registerContentScripts([
      {
        id: "inpage",
        matches: ["file://*/*", "http://*/*", "https://*/*"],
        js: ["./static/js/injected.js"],
        runAt: "document_start",
        world: "MAIN",
      },
    ]);
  } catch (err) {
    /**
     * An error occurs when app-init.js is reloaded. Attempts to avoid the duplicate script error:
     * 1. registeringContentScripts inside runtime.onInstalled - This caused a race condition
     *    in which the provider might not be loaded in time.
     * 2. await chrome.scripting.getRegisteredContentScripts() to check for an existing
     *    inpage script before registering - The provider is not loaded on time.
     */
    console.log(`Dropped attempt to register inpage content script. ${err}`);
  }
}

initScript();
