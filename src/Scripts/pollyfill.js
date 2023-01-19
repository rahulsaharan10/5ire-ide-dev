window.browser = (function () {
  return window.msBrowser || window.browser || window.chrome;
})();

const browser = window.msBrowser || window.browser || window.chrome;
export default browser;
