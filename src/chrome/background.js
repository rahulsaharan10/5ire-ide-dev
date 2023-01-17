/*global chrome a*/

import { wrapStore } from "webext-redux";
import store from "../Store/store";
import { increment } from "../Store/reducer/counter";
export {};

wrapStore(store);

/** Fired when the extension is first installed,
 *  when the extension is updated to a new version,
 *  and when Chrome is updated to a new version. */
chrome.runtime.onInstalled.addListener((details) => {
  console.log("[background.js] onInstalled", details);
  store.dispatch(increment());
});

chrome.runtime.onConnect.addListener((port) => {
  console.log("[background.js] onConnect", port);
  port.onMessage.addListener((msg) => {
    console.log("Inside background message", msg);
    const key = "myKey";
    const value = { name: msg };

    chrome.storage.local.set({ [key]: value }, () => {
      if (chrome.runtime.lastError) console.log("Error setting");

      console.log("Stored name: " + value.name);
    });
  });
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

    // chrome.tabs.query(
    //   {
    //     active: true,
    //     currentWindow: true,
    //   },
    //   (tabs) => {
    //     chrome.pageAction.show(sender.tab.id);
    //   }
    // );
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

// let rt = window.chrome.runtime;

// window.addEventListener(
//   "message",
//   async (event) => {
//     // We only accept messages from ourselves
//     if (event.source != window) {
//       return;
//     }

//     if (event.data.type && event.data.type == "FROM_PAGE_TO_CONTENT_SCRIPT") {
//       console.log("Content script received its background: " + event.data.text);

//       var response = await rt.sendMessage({ greeting: "hello" });

//       // do something with response here, not outside the function
//       console.log(response);
//       // port.postMessage(event.data.text);
//     }
//   },
//   false
// );
