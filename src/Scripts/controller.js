import { configureStore } from "@reduxjs/toolkit";
import { wrapStore } from "webext-redux";
import Browser from "webextension-polyfill";
import { PORT_NAME } from "../Constants";
import logger from "redux-logger";
import authReducer, {
  userState,
  setUIdata,
  setLogin,
} from "../Store/reducer/auth";


// Initializes the Redux store
function init(preloadedState) {
  return new Promise((resolve, reject) => {
    const store = configureStore({
      reducer: { auth: authReducer },
      preloadedState,
      middleware: [logger],
    });

    wrapStore(store, { portName: PORT_NAME });

    // Subscribes to the redux store changes. For each state
    // change, we want to store the new state to the storage.
    store.subscribe(() => {
      Browser.storage.local.set({ state: store.getState() });

      // Optional: other things we want to do on state change
      // Here we update the badge text with the counter value.
      //    Browser.action.setBadgeText({ text: `${store.getState().counter?.value}` });
    });
    Browser.storage.session
      .get(["login"])
      .then((res) => {
        store.dispatch(setLogin(res?.login ? res.login : false));
        resolve(store);
      })
      .catch(reject);
  });
}


//load the redux store
export function loadStore(sendStoreMessage = true) {
  return new Promise(async (resolve) => {
    try {
      Browser.storage.local.get("state").then(async (storage) => {
        // 1. Initializes the redux store and the message passing.
        const store = await init(storage.state || { auth: userState });

        // 2. Sends a message to notify that the store is ready.
        sendStoreMessage &&
          Browser.runtime.sendMessage({ type: "STORE_INITIALIZED" });
        resolve(store);
      });
    } catch (err) {
      console.log("Here error in store", err);
    }
  });
}

//inject the content script into current webpage
export async function initScript() {
  try {
    await Browser.scripting.registerContentScripts([
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

//create an extension video
export function createFireWindow(route = "") {
  const extensionURL = Browser.runtime.getURL("index.html");

  Browser.windows.create({
    url: extensionURL + `?route=${route}`,
    type: "popup",
    focused: true,
    width: 400,
    height: 600,
    top: 0,
    left: 200,
  });
}


//create an 5ire extension notification
export function showNotification(
  message = "",
  title = "Fire Notification",
  type = "basic"
) {
  Browser.notifications.create("", {
    iconUrl: Browser.runtime.getURL("logo192.png"),
    message,
    title,
    type,
  });
}

//account connection handler
export function handleConnect(store, data) {

  const state = store.getState();


  const isEthReq = data?.method === "eth_requestAccounts";
  const isExist = state.auth.connectedSites.find(
    (st) => st.origin === data.payload.origin
  );

  if (isExist?.isConnected) {
    Browser.tabs.sendMessage(data.tabId, {
      id: data.id,
      method: data.method,
      response: isEthReq

        ? [state.auth.currentAccount.evmAddress]
        : {
            evmAddress: state.auth.currentAccount.evmAddress,
            nativeAddress: state.auth.currentAccount.nativeAddress,
          },
      error: null,
    });
  } else {
    store.dispatch(setUIdata(data));
    createFireWindow("rejectnotification");
    // showNotification("Your request for connect is approved");
  }
}


//transfer handler
export function handleEthTransaction(store, data) {
  store.dispatch(
    setUIdata({
      ...data,
      message: data?.message?.params[0],
    })
  );
  createFireWindow("rejectnotification");
}

//get lastest block from chain handler
export async function getLastestBlock(store, data) {
  const state = store.getState().auth;

  Browser.tabs.sendMessage(data.tabId, {
    id: data.id,
    method: data.method,
    response: state.availableNetworks[state.currentNetwork],
    error: null,
  });
}


