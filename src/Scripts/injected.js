import { engine } from "./jsonrpc";
import { WindowPostMessageStream } from "./stream";
import { CONTENT_SCRIPT, INPAGE } from "./constants";

engine.push(function (req, res, next, end) {
  res.result = 42;
  console.log("In injected js", req);
  return end();
});

const injectedStream = new WindowPostMessageStream({
  name: INPAGE,
  target: CONTENT_SCRIPT,
});

window.fire = {
  version: "1.0.0",
  send: () => {
    // engine.handle({ id: 1, jsonrpc: "2.0", method: "hello" }, (err, res) => {
    //   console.log("I got it from jsonrpc", err, res);
    // });

    injectedStream.write("hello");
  },
  isInstalled: true,
};
