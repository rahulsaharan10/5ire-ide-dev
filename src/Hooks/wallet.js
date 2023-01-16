import React,{useState,useEffect} from 'react';
// import { Keyring } from "@polkadot/keyring";
import {
  mnemonicToMiniSecret,
  naclKeypairFromSeed,
  mnemonicGenerate,
} from "@polkadot/util-crypto";
import { decodeAddress, encodeAddress } from "@polkadot/keyring";
import { u8aToHex} from "@polkadot/util";
import { toast } from "react-toastify";
import { ethers } from "ethers";
// import Web3 from "web3";


export default function Wallet() {
    
    const [authData, setAuthData] = useState({
        key: "",
        address: "",
        privatekey: "",
      });

    const walletSignUp = async () => {
        const SS58Prefix = 6;
        try {
            //   const bip39 = require("bip39");
            setAuthData({ key: "", address: "", privatekey: "" });
            const mnemonic = mnemonicGenerate();
            const seedAlice = mnemonicToMiniSecret(mnemonic);
            const Hexa = u8aToHex(seedAlice);
            const { publicKey } = naclKeypairFromSeed(seedAlice);
            const address = encodeAddress(decodeAddress(publicKey, SS58Prefix));
            // setAuthData({ key: mnemonic, address: address, privatekey: Hexa })
            const ethAddress = await ethers.Wallet.fromMnemonic(mnemonic);
            setAuthData({ key: mnemonic, address: address, privatekey: Hexa, ethPrivateKey: ethAddress.privateKey });
            // setEthData({address: ethAddress.address, privatekey: ethAddress.privatekey})

        } catch (error) {
            toast("error", error);
        }
    }

    return {
        walletSignUp,
        setAuthData,
        authData

    }
}
