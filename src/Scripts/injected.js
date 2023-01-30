import { WindowPostMessageStream } from "./stream";
import { CONTENT_SCRIPT, INPAGE } from "./constants";
import {FireProvider} from "./5ire-Provider-Custom/5ire-provider";
import Web3 from "web3";


const injectedStream = new WindowPostMessageStream({
  name: INPAGE,
  target: CONTENT_SCRIPT,
});

injectedStream.write({ method: "keepAlive" });

//listen for data event on window messaging stream's
injectedStream.on("data", (data) => {

  if (data?.method === "keepAlive") {
    setTimeout(() => {
      injectedStream.write({ method: "keepAlive" });
    }, 1000 * 30);
  }


  if (data.id) {
    console.log(data, "Receive a response in injected page");
    console.log("Handlers Object every has a unique id: ", fireProvider.handlers);
    const handler = fireProvider.handlers[data.id];

    if (data.error) {
      handler.reject(data.error);
    } else {
      handler.resolve(data.response);
    }

    delete fireProvider.handlers[data.id];
  }
});

//injected fire instance in window
const fireProvider = new FireProvider();
window.fire = fireProvider
window.fireWeb3 = new Web3(fireProvider);


//old injected
// {
//   version: "1.0.0",

//   //send rpc request metadata to extension for further operations
//   send: (method, req) => {
//     sendMessage(method, JSON.stringify(req)).then((result) => {
//       console.log("My promise worked", result);
//     });
//   },

//   //create a connection to fire extension
//   request: async (method, req=null) => {
//     const res = await sendMessage(method, req || window.location.origin)
//     window.fire.chainInfo.currentSelectedAc = res
//     return res
//   },
//   isInstalled: true,
// };