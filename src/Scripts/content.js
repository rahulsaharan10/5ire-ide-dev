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
          msg: "showPageAction",
          data,
        });

        contentStream.write({
          id: data.id,
          response: "I return back result to UI",
          error: null,
        });

      case "keepAlive":
        setTimeout(() => {
          contentStream.write({
            method: "keepAlive",
          });
        }, 1000 * 60);

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
  console.log("[content.js]. Message received", message);
  if (message?.id) {
    contentStream.write(message);
    cb("I Recevie and ack");
  }

  if (
    sender.id === browser.runtime.id &&
    message.from === "React" &&
    message.message === "Hello from React"
  ) {
    cb("Hello from content.js");
  }
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
browser.runtime.onMessage.addListener(messageFromExtensionUI);

const port = browser.runtime.connect({ name: "knockknock" });
port.onMessage.addListener(function (msg) {
  console.log("I get it", JSON.parse(JSON.stringify(msg)));
  const message = JSON.parse(JSON.stringify(msg));

  // contentStream.write({
  //   id: message.id,
  //   response: message,
  //   error: null,
  // });
});
// const port = browser.runtime.connect({ name: "HelloWorld" });

// const listener = async (event) => {
//   // We only accept messages from ourselves
//   if (event.source != window) {
//     return;
//   }

//   if (event.data.type && event.data.type == "FROM_PAGE_TO_CONTENT_SCRIPT") {
//     console.log("Content script received: " + event.data.text);

//     // do something with response here, not outside the function
//     const msg = port.postMessage(event.data.text);
//     console.log(msg);
//   }
// };
// window.addEventListener("message", listener, false);

// port.onDisconnect.addListener(function () {
//   // clean up when content script gets disconnected
//   window.removeEventListener("message", listener);
// });
