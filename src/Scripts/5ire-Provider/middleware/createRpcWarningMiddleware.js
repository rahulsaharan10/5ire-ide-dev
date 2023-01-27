const messages = require("../messages");
/**
 * Create JSON-RPC middleware that logs warnings for deprecated RPC methods.
 *
 * @param log - The logging API to use.
 * @returns The JSON-RPC middleware.
 */
function createRpcWarningMiddleware(log) {
    const sentWarnings = {
        ethDecryptDeprecation: false,
        ethGetEncryptionPublicKeyDeprecation: false,
    };
    return (req, _res, next) => {

        console.log("Here in createRpcWarningMiddleware: ", req, _res);

        if (sentWarnings.ethDecryptDeprecation === false &&
            req.method === 'eth_decrypt') {
            log.warn(messages.default.warnings.rpc.ethDecryptDeprecation);
            sentWarnings.ethDecryptDeprecation = true;
        }
        else if (sentWarnings.ethGetEncryptionPublicKeyDeprecation === false &&
            req.method === 'eth_getEncryptionPublicKey') {
            log.warn(messages.default.warnings.rpc.ethGetEncryptionPublicKeyDeprecation);
            sentWarnings.ethGetEncryptionPublicKeyDeprecation = true;
        }
        next();
    };
}
module.exports.createRpcWarningMiddleware = createRpcWarningMiddleware;