import React, { useState, useEffect } from 'react';
import {
    mnemonicGenerate,
    mnemonicToMiniSecret,
    mnemonicValidate,
    ed25519PairFromSeed
} from '@polkadot/util-crypto';
import { decodeAddress, encodeAddress, } from "@polkadot/keyring";
import { u8aToHex } from "@polkadot/util";
import { ethers } from "ethers";
// import Web3 from "web3";
// import { Keyring } from "@polkadot/keyring";


export default function Wallet() {

    const [authData, setAuthData] = useState({
        mnemonic: "",
        nativeAddress: "",
        evmAddress: "",
        privatekey: "",
        evmPrivatekey: "",
    });

    const walletSignUp = async () => {
        try {
            const SS58Prefix = 6;
            // Create mnemonic string for Alice using BIP39
            const mnemonicAlice = mnemonicGenerate();

            // Validate the mnemonic string that was generated
            const isValidMnemonic = mnemonicValidate(mnemonicAlice);

            // Create valid Substrate-compatible seed from mnemonic
            const seedAlice = mnemonicToMiniSecret(mnemonicAlice);

            // Generate new public/secret keypair for Alice from the supplied seed
            const { publicKey } = ed25519PairFromSeed(seedAlice);

            const address = encodeAddress(decodeAddress(publicKey, SS58Prefix));
            const ethAddress = await ethers.Wallet.fromMnemonic(mnemonicAlice);

            setAuthData({ mnemonic: mnemonicAlice, nativeAddress: address, evmAddress: ethAddress.address, evmPrivatekey: ethAddress.privateKey });

        } catch (error) {
            console.log("error", error);
        }
    }

    return {
        walletSignUp,
        setAuthData,
        authData

    }
}
