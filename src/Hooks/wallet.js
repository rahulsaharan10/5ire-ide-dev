import React, { useState, useEffect } from "react";
import {
  mnemonicGenerate,
  mnemonicToMiniSecret,
  mnemonicValidate,
  ed25519PairFromSeed,
  cryptoWaitReady,
} from "@polkadot/util-crypto";
import { waitReady } from "@polkadot/wasm-crypto";
import { ApiPromise } from "@polkadot/api";
import { HttpProvider, WsProvider } from "@polkadot/rpc-provider";
import { u8aToHex } from "@polkadot/util";
import { ethers } from "ethers";
import { useSelector, useDispatch } from "react-redux";
import { setBalance } from "../Store/reducer/auth";
import { QA_NETWORK, TEST_NETWORK } from "../Constants/index";
import { decodeAddress, encodeAddress } from "@polkadot/keyring";
import Web3 from "web3";
// import Web3 from "web3";
// import { Keyring } from "@polkadot/keyring";

export default function Wallet() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state?.auth);
  const [evmApi, setEvmApi] = useState(
    new Web3(selector?.availableNetworks?.testnet)
  );
  const [nativeApi, setNativeApi] = useState(null);
  const [isApiReady, setReady] = useState(false);

  const [authData, setAuthData] = useState({
    mnemonic: "",
    nativeAddress: "",
    evmAddress: "",
    privatekey: "",
    evmPrivatekey: "",
  });

  useEffect(() => {
    setUpApi(selector?.availableNetworks?.testnet);
  }, []);

  useEffect(() => {
    if (selector?.currentNetwork === TEST_NETWORK)
      setUpApi(selector?.availableNetworks?.testnet);
    else if (selector?.currentNetwork === QA_NETWORK)
      setUpApi(selector?.availableNetworks?.qa);
  }, [selector.currentNetwork]);

  useEffect(() => {
    console.log("nativeApi : ", nativeApi);
    if (nativeApi) setReady(true);
  }, [nativeApi]);

  const setUpApi = async (network) => {
    let evm_api = new Web3(network);
    setEvmApi(evm_api);

    let provider;
    if (network?.startsWith("wss")) provider = new WsProvider(network);
    else provider = new HttpProvider(network);

    console.log("Provider :: ", provider);

    await cryptoWaitReady();
    await waitReady();
    const apiRes = await ApiPromise.create({ provider: provider });
    setNativeApi(apiRes);
  };

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
      const ethAddress = ethers.Wallet.fromMnemonic(mnemonicAlice);

      setAuthData({
        mnemonic: mnemonicAlice,
        nativeAddress: address,
        evmAddress: ethAddress.address,
        evmPrivatekey: ethAddress.privateKey,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const evmBalance = async () => {
    try {
      const w3balance = await evmApi?.eth.getBalance(
        selector?.currentAccount?.evmAddress
      );
      let payload = {
        of: "evm",
        balance: Number(w3balance),
      };
      dispatch(setBalance(payload));
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const nativeBalance = async () => {
    const nbalance = await nativeApi?.derive.balances.all(
      selector?.currentAccount?.nativeAddress
    );
    console.log("nativeBalance : ", nbalance);
    let payload = {
      of: "native",
      balance: Number(nbalance),
    };
    dispatch(setBalance(payload));
  };

  return {
    walletSignUp,
    setAuthData,
    authData,
    evmBalance,
    nativeBalance,
    isApiReady,
  };
}
