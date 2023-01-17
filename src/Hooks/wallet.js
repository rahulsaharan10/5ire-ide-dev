import React, { useState, useEffect } from 'react';
// import { Keyring } from "@polkadot/keyring";
import {
    mnemonicToMiniSecret,
    naclKeypairFromSeed,
    mnemonicGenerate,
} from "@polkadot/util-crypto";
import { decodeAddress, encodeAddress } from "@polkadot/keyring";
import { u8aToHex } from "@polkadot/util";
import { ethers } from "ethers";
// import Web3 from "web3";


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
            const mnemonic = mnemonicGenerate();
            const seedAlice = mnemonicToMiniSecret(mnemonic);
            const Hexa = u8aToHex(seedAlice);
            const { publicKey } = naclKeypairFromSeed(seedAlice);
            const address = encodeAddress(decodeAddress(publicKey, SS58Prefix));
            const ethAddress = await ethers.Wallet.fromMnemonic(mnemonic);
            setAuthData({ mnemonic: mnemonic, nativeAddress: address, evmAddress: ethAddress.address, privatekey: Hexa, evmPrivatekey: ethAddress.privateKey });

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
