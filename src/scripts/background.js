/*global chrome a*/

export { };

// window.browser = (function () {
//   return window.msBrowser ||
//     window.browser ||
//     window.chrome;
// })();
/** Fired when the extension is first installed,
 *  when the extension is updated to a new version,
 *  and when Chrome is updated to a new version. */
chrome.runtime.onInstalled.addListener((details) => {
  console.log("[background.js] onInstalled", details);
  alert("[background.js] onInstalled");
});

chrome.runtime.onConnect.addListener((port) => {
  console.log("[background.js] onConnect", port);
  alert("[background.js] onInstalled");
});

chrome.runtime.onStartup.addListener(() => {
  console.log("[background.js] onStartup");
  alert("[background.js] onInstalled");
});

chrome.runtime.onMessage.addListener(request => {

  if (request === "OpenPopup") {

      window.chrome.windows.create({
          url: "index.html",
          type: "popup",
          focused: true,
          width: 400,
          height: 600,
          top: 0,
          // left: screen.width - 400,
      }, () => {
          console.log("Opened popup!")
      })

  }

})