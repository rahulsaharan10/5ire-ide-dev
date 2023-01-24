import { Store, applyMiddleware } from "webext-redux";
import thunkMiddleware from "redux-thunk";
import browser from "./pollyfill";
import { WindowPostMessageStream } from "./stream";
import { CONTENT_SCRIPT, INPAGE } from "./constants";

const contentStream = new WindowPostMessageStream({
  name: CONTENT_SCRIPT,
  target: INPAGE,
});

export const store = new Store();

contentStream.on("data", async (data) => {
  try {
    console.log(JSON.stringify(data) + ", world in content js");
    switch (data.method) {
      case "request":
        contentStream.write({
          id: data.id,
          response: "I return back result to you",
          error: null,
        });
      case "ui":
        browser.runtime.sendMessage({
          action: "showPageAction",
          ...data,
        });
      case "keepAlive":
        setTimeout(() => {
          contentStream.write({
            method: "keepAlive",
          });
        }, 1000 * 30);

      default:
    }
  } catch (err) {
    console.log("Error under content script", err);
  }
});

// Proxy store

// // Apply middleware to proxy store
// const middleware = [thunkMiddleware];
// const storeWithMiddleware = applyMiddleware(store, ...middleware);

// // You can now dispatch a function from the proxy store
// storeWithMiddleware.dispatch((dispatch, getState) => {
//   // Regular dispatches will still be routed to the background
//   dispatch(increment());
// });

const messageFromExtensionUI = (message, sender, cb) => {
  console.log("[content.js]. Message received", JSON.stringify(message));
  if (message?.id) {
    contentStream.write(message);
    cb("I Recevie and ack");
  }
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
browser.runtime.onMessage.addListener(messageFromExtensionUI);
