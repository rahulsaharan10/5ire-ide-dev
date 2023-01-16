const messagesFromReactAppListener = (message, sender, response) => {
    console.log("[content.js]. Message received", {
      message,
      sender,
    });
  
    if (
      sender.id === window.chrome.runtime.id &&
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
  
  const port = window.chrome.runtime.connect({ name: "HelloWorld" });
  
  const listener = async (event) => {
    // We only accept messages from ourselves
    if (event.source != window) {
      return;
    }
  
    if (event.data.type && event.data.type == "FROM_PAGE_TO_CONTENT_SCRIPT") {
      console.log("Content script received: " + event.data.text);
      window.chrome.runtime.sendMessage({ msg: "showPageAction" });
  
      // var response = await rt.sendMessage({ greeting: "hello" });
  
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
  
  // var port = window.chrome.runtime.connect({ name: "knockknock" });
  // port.postMessage({ joke: "Knock knock" });
  // port.onMessage.addListener(function (msg) {
  //   if (msg.question === "Who's there?") port.postMessage({ answer: "Madame" });
  //   else if (msg.question === "Madame who?")
  //     port.postMessage({ answer: "Madame... Bovary" });
  // });
  