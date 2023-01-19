import { WindowPostMessageStream } from "./stream";
import { CONTENT_SCRIPT, INPAGE, getId } from "./constants";

const injectedStream = new WindowPostMessageStream({
  name: INPAGE,
  target: CONTENT_SCRIPT,
});

const handlers = {};

function sendMessage(message) {
  return new Promise((resolve, reject) => {
    const id = getId();

    handlers[id] = { reject, resolve };

    const transportRequestMessage = {
      id,
      message,
      origin: INPAGE,
    };

    injectedStream.write(transportRequestMessage);
  });
}

window.fire = {
  version: "1.0.0",
  send: () => {
    sendMessage({ data: "this is sample message from injected" }).then(
      (result) => {
        console.log("My promise worked", result);
      }
    );
  },
  isInstalled: true,
};

injectedStream.on("data", (data) => {
  console.log(data + ", world in page js");

  const handler = handlers[data.id];
  if (data.error) {
    handler.reject(data.error);
  } else {
    handler.resolve(data.response);
  }
});
