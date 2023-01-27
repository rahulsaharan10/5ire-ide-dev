import { WindowPostMessageStream } from "./stream";
import { CONTENT_SCRIPT, INPAGE, getId } from "./constants";

/* eslint-disable import/first */
// import log from 'loglevel';
// import { initializeProvider } from './5ire-Provider/initializeInpageProvider';
// import shouldInjectProvider from './provider-injection';


const injectedStream = new WindowPostMessageStream({
  name: INPAGE,
  target: CONTENT_SCRIPT,
});


const handlers = {};

injectedStream.write({ method: "keepAlive" });

function sendMessage(method, message = "") {
  return new Promise((resolve, reject) => {
    try {
      const id = getId();

      //handler added with a random id and promise reject and resolve functionss
      handlers[id] = { reject, resolve, id };

      if (method === "eth_requestAccounts") {
        message.origin = window.location.origin;
      }
      const transportRequestMessage = {
        id,
        message,
        origin: INPAGE,
        method,
      };

      injectedStream.write(transportRequestMessage);

    } catch (err) {
      console.log("Here error got", err);
      reject(err);
    }
  });
}

//injected fire instance in window
window.fire = {
  version: "1.0.0",

  //send rpc request metadata to extension for further operations
  send: (method, req) => {
    sendMessage(method, JSON.stringify(req)).then((result) => {
      console.log("My promise worked", result);
    });
  },

  //create a connection to fire extension
  request: async (method, req=null) => {
    const res = await sendMessage(method, req || window.location.origin)
    window.fire.chainInfo.currentSelectedAc = res
    return res
  },
  isInstalled: true,

  //current selected accounts
  chainInfo: {
    currentSelectedAc: null,
    chainId: "0x3e5",
    version: 997
  }
};



injectedStream.on("data", (data) => {

  if (data?.method === "keepAlive") {
    setTimeout(() => {
      injectedStream.write({ method: "keepAlive" });
    }, 1000 * 30);
  }


  if (data.id) {
    console.log(JSON.stringify(data) + "Receive a response in injected page");
    console.log("Handlers Object every has a unique id: ", handlers);
    const handler = handlers[data.id];

    if (data.error) {
      handler.reject(data.error);
    } else {
      handler.resolve(data.response);
    }

    delete handlers[data.id];
  }
});




//==================For Injection of web3 provider================
// need to make sure we aren't affected by overlapping namespaces
// and that we dont affect the app with our namespace
// mostly a fix for web3's BigNumber if AMD's "define" is defined...


// log.setDefaultLevel(process.env.METAMASK_DEBUG ? 'debug' : 'warn');


// if (shouldInjectProvider()) {
//   // setup background connection
//   const metamaskStream = new WindowPostMessageStream({
//     name: INPAGE,
//     target: CONTENT_SCRIPT,
//   });

//   initializeProvider({
//     connectionStream: metamaskStream,
//     logger: log,
//     shouldShimWeb3: true,
//   });
// }
