import Browser from "webextension-polyfill";
import { WindowPostMessageStream } from "./stream";
import { CONTENT_SCRIPT, INPAGE } from "./constants";
import Web3 from "web3";

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
        break;
      case "connect":
      case "eth_requestAccounts":
        Browser.runtime.sendMessage(data);
        break;
      case "eth_sendTransaction":
        if (
          data.message.method !== "eth_sendTransaction" ||
          data.message?.params.length < 0
        ) {
          contentStream.write({
            id: data.id,
            error: "Invalid Transaction Request",
          });
        } else {
          Browser.runtime.sendMessage(data);
        }
        break;
      case "keepAlive":
        setTimeout(() => {
          contentStream.write({
            method: "keepAlive",
          });
        }, 1000 * 30);
        break;


        case "eth_getBlockByNumber":
          Browser.runtime.sendMessage(data);
        break;

      default:
        contentStream.write({
          id: data.id,
          error: "Invalid request method",
        });
    }
  } catch (err) {
    console.log("Error under content script", err);
  }
});

const messageFromExtensionUI = async (message, sender, cb) => {
  if (message?.id) {
    console.log("Message received in content.js: ", message);

    if(message.response !== undefined && message.method === "eth_getBlockByNumber") {
      const res = await getLastestBlockNumber(message)
      contentStream.write(res);
    } else contentStream.write(message);
      cb("I Recevie and ack");
  }
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
Browser.runtime.onMessage.addListener(messageFromExtensionUI);

//get the lastest block from chain
const getLastestBlockNumber = async (data) => {
  try {
    const web3 = new Web3(new Web3.providers.WebsocketProvider(data.response))
    const res = await web3.eth.getBlockNumber();
    return data.response = res;
  } catch (err) {
    console.log("Error while creating getting lastest block number: ", err);
  }
}