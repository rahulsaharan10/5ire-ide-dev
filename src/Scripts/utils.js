export const getCurrentTabUrl = (callback) => {
  const queryInfo = { active: true, lastFocusedWindow: true };

  window.browser.tabs &&
    window.browser.tabs.query(queryInfo, (tabs) => {
      callback(tabs[0].url);
    });
};

export const getCurrentTabUId = (callback) => {
  const queryInfo = { active: true, lastFocusedWindow: true };

  window.browser.tabs &&
    window.browser.tabs.query(queryInfo, (tabs) => {
      callback(tabs[0].id);
    });
};
