import Browser from "webextension-polyfill";
import { WindowPostMessageStream } from "./stream";
import { CONTENT_SCRIPT, INPAGE } from "./constants";

const contentStream = new WindowPostMessageStream({
  name: CONTENT_SCRIPT,
  target: INPAGE,
});

contentStream.on("data", async (data) => {
  try {
    switch (data.method) {
      case "request":
        contentStream.write({
          id: data.id,
          response: "I return back result to you",
          error: null,
        });
      case "connect":
        Browser.runtime.sendMessage(data);
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

const messageFromExtensionUI = (message, sender, cb) => {
  if (message?.id) {
    console.log("[content.js]. Message received", JSON.stringify(message));

    contentStream.write(message);
    cb("I Recevie and ack");
  }
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
Browser.runtime.onMessage.addListener(messageFromExtensionUI);
