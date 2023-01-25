import Browser from "webextension-polyfill";
export const getCurrentTabUrl = (callback) => {
  const queryInfo = { active: true, lastFocusedWindow: true };

  Browser.tabs &&
    Browser.tabs.query(queryInfo, (tabs) => {
      callback(tabs[0].url);
    });
};

export const getCurrentTabUId = (callback) => {
  const queryInfo = { active: true, lastFocusedWindow: true };

  Browser.tabs &&
    Browser.tabs.query(queryInfo, (tabs) => {
      callback(tabs[0].id);
    });
};
