import { Store, applyMiddleware } from "webext-redux";
import thunkMiddleware from "redux-thunk";
import { increment } from "../Store/reducer/counter";
import browser from "./pollyfill";

// Proxy store
const store = new Store();

// // Apply middleware to proxy store
// const middleware = [thunkMiddleware];
// const storeWithMiddleware = applyMiddleware(store, ...middleware);

// // You can now dispatch a function from the proxy store
// storeWithMiddleware.dispatch((dispatch, getState) => {
//   // Regular dispatches will still be routed to the background
//   dispatch(increment());
// });

const messagesFromReactAppListener = (message, sender, response) => {
  console.log("[content.js]. Message received", {
    message,
    sender,
  });

  if (
    sender.id === browser.runtime.id &&
    message.from === "React" &&
    message.message === "Hello from React"
  ) {
    response("Hello from content.js");
  }
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
window.chrome.runtime.onMessage.addListener(messagesFromReactAppListener);

const port = browser.runtime.connect({ name: "HelloWorld" });

const listener = async (event) => {
  // We only accept messages from ourselves
  if (event.source != window) {
    return;
  }

  if (event.data.type && event.data.type == "FROM_PAGE_TO_CONTENT_SCRIPT") {
    console.log("Content script received: " + event.data.text);
    browser.runtime.sendMessage({ msg: "showPageAction" });

    // var response = await rt.sendMessage({ greeting: "hello" });
    store.dispatch(increment());
    // do something with response here, not outside the function
    const msg = port.postMessage(event.data.text);
    console.log(msg);
  }
};
window.addEventListener("message", listener, false);
port.onDisconnect.addListener(function () {
  // clean up when content script gets disconnected
  window.removeEventListener("message", listener);
});
