import { WindowPostMessageStream } from "./stream";
import { CONTENT_SCRIPT, INPAGE, getId } from "./constants";
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

window.fire = {
  version: "1.0.0",
  isInstalled: true,
  send: () => {
    sendMessage("request", {
      data: "this is sample message from injected",
    }).then((result) => {
      console.log("My promise worked", result);
    });
  },
  connect: () => sendMessage("connect", { origin: window.location.origin }),
  request: (params) => sendMessage(params.method, params),
};

injectedStream.on("data", (data) => {
  if (data?.method === "keepAlive") {
    setTimeout(() => {
      injectedStream.write({ method: "keepAlive" });
    }, 1000 * 30);
  }
  if (data.id) {
    console.log("HERE HANDLERS", handlers);
    const handler = handlers[data.id];
    if (data.error) {
      handler.reject(data.error);
    } else {
      handler.resolve(data.response);
    }
    delete handlers[data.id];
  }
});
