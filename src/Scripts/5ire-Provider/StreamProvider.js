const object_multiplex = require("./object-multiplex/index");
const is_stream = require("is-stream");
const json_rpc_middleware_stream = require("./json-rpc-middleware-stream/index");
const pump = require("./pump/index");
const messages = require("./messages");
const utils = require("./utils");
const BaseProvider = require("./BaseProvider");
/**
 * An abstract EIP-1193 provider wired to some duplex stream via a
 * `json-rpc-middleware-stream` JSON-RPC stream middleware. Implementers must
 * call {@link AbstractStreamProvider._initializeStateAsync} after instantiation
 * to initialize the provider's state.
 */
export class AbstractStreamProvider extends BaseProvider.BaseProvider {
    /**
     * @param connectionStream - A Node.js duplex stream
     * @param options - An options bag
     * @param options.jsonRpcStreamName - The name of the internal JSON-RPC stream.
     * @param options.logger - The logging API to use. Default: console
     * @param options.maxEventListeners - The maximum number of event
     * listeners. Default: 100
     */
    constructor(connectionStream, { jsonRpcStreamName, logger, maxEventListeners, rpcMiddleware}) {

        console.log("here is the rpc middleware in StreamProvider: ", rpcMiddleware);

        super({ logger, maxEventListeners, rpcMiddleware });

        if (!is_stream.duplex(connectionStream)) {
            throw new Error(messages.default.errors.invalidDuplexStream());
        }
        // Bind functions to prevent consumers from making unbound calls
        this._handleStreamDisconnect = this._handleStreamDisconnect.bind(this);
        // Set up connectionStream multiplexing
        const mux = new object_multiplex();
        pump.default(connectionStream, mux, connectionStream, this._handleStreamDisconnect.bind(this, 'MetaMask'));
        // Set up RPC connection

        this._jsonRpcConnection = json_rpc_middleware_stream({
            retryOnMessage: 'METAMASK_EXTENSION_CONNECT_CAN_RETRY',
        });

        console.log("inside the stream provider to handler: ", this._jsonRpcConnection);

        pump.default(this._jsonRpcConnection.stream, mux.createStream(jsonRpcStreamName), this._jsonRpcConnection.stream, this._handleStreamDisconnect.bind(this, 'MetaMask RpcProvider'));
        // Wire up the JsonRpcEngine to the JSON-RPC connection stream
        this._rpcEngine.push(this._jsonRpcConnection.middleware);
        // Handle JSON-RPC notifications
        this._jsonRpcConnection.events.on('notification', (payload) => {
            const { method, params } = payload;
            if (method === 'metamask_accountsChanged') {
                this._handleAccountsChanged(params);
            }
            else if (method === 'metamask_unlockStateChanged') {
                this._handleUnlockStateChanged(params);
            }
            else if (method === 'metamask_chainChanged') {
                this._handleChainChanged(params);
            }
            else if (utils.EMITTED_NOTIFICATIONS.includes(method)) {
                this.emit('message', {
                    type: method,
                    data: params,
                });
            }
            else if (method === 'METAMASK_STREAM_FAILURE') {
                connectionStream.destroy(new Error(messages.default.errors.permanentlyDisconnected()));
            }
        });
    }
    //====================
    // Private Methods
    //====================
    /**
     * **MUST** be called by child classes.
     *
     * Calls `metamask_getProviderState` and passes the result to
     * {@link BaseProvider._initializeState}. Logs an error if getting initial state
     * fails. Throws if called after initialization has completed.
     */
    async _initializeStateAsync() {
        let initialState;
        try {
            initialState = (await this.request({
                method: 'metamask_getProviderState',
            }));
        }
        catch (error) {
            this._log.error('MetaMask: Failed to get initial state. Please report this bug.', error);
        }
        this._initializeState(initialState);
    }
    /**
     * Called when connection is lost to critical streams. Emits an 'error' event
     * from the provider with the error message and stack if present.
     *
     * @emits BaseProvider#disconnect
     */
    _handleStreamDisconnect(streamName, error) {
        let warningMsg = `MetaMask: Lost connection to "${streamName}".`;
        if (error === null || error === void 0 ? void 0 : error.stack) {
            warningMsg += `\n${error.stack}`;
        }
        this._log.warn(warningMsg);
        if (this.listenerCount('error') > 0) {
            this.emit('error', warningMsg);
        }
        this._handleDisconnect(false, error ? error.message : undefined);
    }
    /**
     * Upon receipt of a new chainId and networkVersion, emits corresponding
     * events and sets relevant public state. This class does not have a
     * `networkVersion` property, but we rely on receiving a `networkVersion`
     * with the value of `loading` to detect when the network is changing and
     * a recoverable `disconnect` even has occurred. Child classes that use the
     * `networkVersion` for other purposes must implement additional handling
     * therefore.
     *
     * @emits BaseProvider#chainChanged
     * @param networkInfo - An object with network info.
     * @param networkInfo.chainId - The latest chain ID.
     * @param networkInfo.networkVersion - The latest network ID.
     */
    _handleChainChanged({ chainId, networkVersion, } = {}) {
        if (!utils.isValidChainId(chainId) || !utils.isValidNetworkVersion(networkVersion)) {
            this._log.error(messages.default.errors.invalidNetworkParams(), {
                chainId,
                networkVersion,
            });
            return;
        }
        if (networkVersion === 'loading') {
            this._handleDisconnect(true);
        }
        else {
            super._handleChainChanged({ chainId });
        }
    }
}

/**
 * An EIP-1193 provider wired to some duplex stream via a
 * `json-rpc-middleware-stream` JSON-RPC stream middleware. Consumers must
 * call {@link StreamProvider.initialize} after instantiation to complete
 * initialization.
 */
export class StreamProvider extends AbstractStreamProvider {
    /**
     * **MUST** be called after instantiation to complete initialization.
     *
     * Calls `metamask_getProviderState` and passes the result to
     * {@link BaseProvider._initializeState}. Logs an error if getting initial state
     * fails. Throws if called after initialization has completed.
     */
    async initialize() {
        return this._initializeStateAsync();
    }
}