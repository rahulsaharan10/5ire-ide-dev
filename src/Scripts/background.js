import { CONNECTION_NAME } from "../Constants";
import {
  handleConnect,
  handleEthTransaction,
  initScript,
  loadStore,
} from "./controller";
import Browser from "webextension-polyfill";

let isInitialized = false,
  store;

Browser.runtime.onConnect.addListener(async (port) => {
  if (port.name === CONNECTION_NAME) {
    store = await loadStore();
    isInitialized = true;
  }
});

/** Fired when the extension is first installed,
 *  when the extension is updated to a new version,
 *  and when Chrome is updated to a new version. */
Browser.runtime.onInstalled.addListener((details) => {
  console.log("[background.js] onInstalled", details);
});

Browser.runtime.onStartup.addListener(() => {
  console.log("[background.js] onStartup");
});

Browser.runtime.onMessage.addListener(async function (message, sender, cb) {
  console.log("Here i am getting message", message);

  if (!isInitialized) {
    store = await loadStore(false);
    isInitialized = true;
  }
  const data = {
    ...message,
    tabId: sender?.tab?.id,
  };
  switch (data?.method) {
    case "connect":
    case "eth_requestAccounts":
      handleConnect(store, data);
      break;
    case "eth_sendTransaction":
      handleEthTransaction(store, data);
      break;
    default:
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
Browser.runtime.onSuspend.addListener(() => {
  console.log("[background.js] onSuspend");
  isInitialized = false;
});

initScript();
