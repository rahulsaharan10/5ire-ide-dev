const extension_port_stream = require("extension-port-stream");
const detect_browser = require("detect-browser");
const MetaMaskInpageProvider = require("../MetaMaskInpageProvider");
const StreamProvider = require("../StreamProvider");
const utils = require("../utils");
const external_extension_config_json = require("./external-extension-config.json");
const browser = detect_browser.detect();


function createExternalExtensionProvider() {
    let provider;
    try {
        const currentMetaMaskId = getMetaMaskId();
        const metamaskPort = chrome.runtime.connect(currentMetaMaskId);
        const pluginStream = new extension_port_stream.default(metamaskPort);
        provider = new StreamProvider.StreamProvider(pluginStream, {
            jsonRpcStreamName: MetaMaskInpageProvider.MetaMaskInpageProviderStreamName,
            logger: console,
            rpcMiddleware: utils.getDefaultExternalMiddleware(console),
        });
        // This is asynchronous but merely logs an error and does not throw upon
        // failure. Previously this just happened as a side-effect in the
        // constructor.
        provider.initialize();
    }
    catch (error) {
        console.dir(`MetaMask connect error.`, error);
        throw error;
    }
    return provider;
}
module.exports.createExternalExtensionProvider = createExternalExtensionProvider;
function getMetaMaskId() {
    switch (browser === null || browser === void 0 ? void 0 : browser.name) {
        case 'chrome':
            return external_extension_config_json.default.CHROME_ID;
        case 'firefox':
            return external_extension_config_json.default.FIREFOX_ID;
        default:
            return external_extension_config_json.default.CHROME_ID;
    }
}