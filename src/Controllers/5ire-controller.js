import KeyringController from '@metamask/eth-keyring-controller';
import SimpleKeyring from '@metamask/eth-simple-keyring';
import Event from 'events';

export default class Controller extends Event {

    constructor(initState) {
        super();
        this.keyringController = new KeyringController({
            keyringTypes: [SimpleKeyring], // optional array of types to support.
            initState: initState.KeyringController, // Last emitted persisted state.
            encryptor: {
                // An optional object for defining encryption schemes:
                // Defaults to Browser-native SubtleCrypto.
                encrypt(password, object) {
                    return new Promise('encrypted!');
                },
                decrypt(password, encryptedString) {
                    return new Promise({ foo: 'bar' });
                },
            },
        });
        this.keyringController.on('newAccount', (address) => {
            console.log(`New account created: ${address}`);
        });
    }

}