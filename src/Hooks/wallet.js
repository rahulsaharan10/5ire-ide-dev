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
import { ethers } from "ethers";
import { useSelector, useDispatch } from "react-redux";
// import { setBalance } from "../Store/reducer/auth";
import { QA_NETWORK, TEST_NETWORK } from "../Constants/index";
import { decodeAddress, encodeAddress } from "@polkadot/keyring";
import { Keyring } from "@polkadot/keyring";
import {
  setCurrentAcc,
  setAccounts,
  setLogin,
  setBalance,
} from "../Store/reducer/auth";
import Web3 from "web3";
// import { u8aToHex } from "@polkadot/util";

export default function Wallet() {
  const dispatch = useDispatch();
  const { currentAccount, availableNetworks, currentNetwork } = useSelector(
    (state) => state?.auth
  );
  const [evmApi, setEvmApi] = useState(null);
  const [nativeApi, setNativeApi] = useState(null);
  // const [evmBalance, setEvmBalance] = useState(0);
  // const [nativeBalance, setNativeBalance] = useState(0);
  const [isApiReady, setReady] = useState(false);

  const [authData, setAuthData] = useState({
    mnemonic: "",
    nativeAddress: "",
    evmAddress: "",
    privatekey: "",
    evmPrivatekey: "",
  });

  // useEffect(() => {
  //     setUpApi(availableNetworks?.testnet);
  // }, [availableNetworks?.testnet]);

  useEffect(() => {
    console.log("Current network : ", currentNetwork);
    setReady(false);
    if (currentNetwork === TEST_NETWORK) setUpApi(availableNetworks?.testnet);
    else if (currentNetwork === QA_NETWORK) setUpApi(availableNetworks?.qa);
  }, [currentNetwork]);

  // useEffect(() => {
  //     if (nativeApi && evmApi) setReady(true);
  // }, [nativeApi, evmApi]);

  const setUpApi = async (network) => {
    console.log("Network : ", network);
    let evm_api = new Web3(network);
    setEvmApi(evm_api);

    let provider;
    if (network?.startsWith("wss")) provider = new WsProvider(network);
    else provider = new HttpProvider(network);

    await cryptoWaitReady();
    await waitReady();
    const apiRes = await ApiPromise.create({ provider: provider });
    setNativeApi(apiRes);
    if (apiRes) setReady(true);
  };

  const walletSignUp = async () => {
    try {
      const SS58Prefix = 6;
      // Create mnemonic string for Alice using BIP39
      const mnemonicAlice = mnemonicGenerate();

      // Validate the mnemonic string that was generated
      // const isValidMnemonic = mnemonicValidate(mnemonicAlice);

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

  const getEvmBalance = async () => {
    try {
      const w3balance = await evmApi?.eth.getBalance(
        currentAccount?.evmAddress
      );
      let payload = {
        of: "evm",
        balance: parseInt(Number(w3balance) / Math.pow(10, 18)),
      };
      console.log(
        "evm balance : ",
        parseInt(Number(w3balance) / Math.pow(10, 18))
      );
      dispatch(setBalance(payload));
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const getNativeBalance = async () => {
    const nbalance = await nativeApi?.derive.balances.all(
      currentAccount?.nativeAddress
    );
    let payload = {
      of: "native",
      balance: parseInt(Number(nbalance.availableBalance) / Math.pow(10, 18)),
    };
    console.log(
      "nativeBalance : ",
      parseInt(Number(nbalance.availableBalance) / Math.pow(10, 18))
    );

    dispatch(setBalance(payload));
  };

  const evmTransfer = async (data) => {
    try {
      let to = Web3.utils.toChecksumAddress(data.to);
      const transactions = {
        from: currentAccount?.evmAddress,
        to: to,
        value: (Number(data.amount) * Math.pow(10, 18)).toString(),
        gas: 21000, //wei
        nonce: await evmApi.eth.getTransactionCount(
          currentAccount?.evmAddress,
          "pending"
        ),
      };
      const signedTx = await evmApi.eth.accounts.signTransaction(
        transactions,
        currentAccount.evmPrivatekey
      );

      const txInfo = await evmApi.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );

      console.log("Tx hash : ", txInfo.transactionHash);
      const hash = txInfo.transactionHash;
      if (hash)
        return {
          error: false,
          data: hash,
        };
      else
        return {
          error: true,
          data: "transaction failed!",
        };
    } catch (error) {
      console.log("Error : ", error);
      return {
        error: true,
        data: "Error occured while sending!",
      };
    }
  };

  const nativeTransfer = async (data) => {
    try {
      const seedAlice = mnemonicToMiniSecret(currentAccount.mnemonic);
      const keyring = new Keyring({ type: "ed25519" });
      const alice = keyring.addFromPair(ed25519PairFromSeed(seedAlice));
      const transfer = nativeApi.tx.balances.transferKeepAlive(
        data.toAddress,
        (Number(data.amount) * Math.pow(10, 18)).toString()
      );
      const transferRes = await transfer.signAndSend(alice);
      const hash = transferRes.toHex();

      if (hash)
        return {
          error: false,
          data: hash,
        };
      else
        return {
          error: true,
          data: "transaction failed!",
        };
    } catch (error) {
      console.log("Error : ", error);
      return {
        error: true,
        data: "Error occured while sending!",
      };
    }
  };

  const nativeToEvmSwap = async (amount) => {
    try {
      const seedAlice = mnemonicToMiniSecret(currentAccount.mnemonic);
      const keyring = new Keyring({ type: "ed25519" });
      const alice = keyring.addFromPair(ed25519PairFromSeed(seedAlice));
    } catch (error) {
      console.log("Error : ", error);
      return {
        error: true,
        data: "Error occured while sending!",
      };
    }
  };

  const importAccount = async (key) => {
    try {
      const SS58Prefix = 6;
      const isValidMnemonic = mnemonicValidate(key);
      console.log("Is mnemonics is valid: ", isValidMnemonic);

      if (isValidMnemonic) {
        // Create valid Substrate-compatible seed from mnemonic
        const seedAlice = mnemonicToMiniSecret(key);

        // Generate new public/secret keypair for Alice from the supplied seed
        const { publicKey } = ed25519PairFromSeed(seedAlice);

        const address = encodeAddress(decodeAddress(publicKey, SS58Prefix));
        const ethAddress = ethers.Wallet.fromMnemonic(key);

        const payload = {
          mnemonic: key,
          nativeAddress: address,
          evmAddress: ethAddress.address,
          evmPrivatekey: ethAddress.privateKey,
        };
        dispatch(setCurrentAcc(payload));
        dispatch(setAccounts(payload));
        dispatch(setLogin(true));

        return {
          error: false,
          data: "success",
        };
      } else
        return {
          error: true,
          data: "Invalid mnemonic!",
        };
    } catch (error) {
      console.log("Error : ", error);
      return {
        error: true,
        data: "Something went wrong!",
      };
    }
  };

  return {
    walletSignUp,
    setAuthData,
    authData,
    getEvmBalance,
    getNativeBalance,
    isApiReady,
    evmTransfer,
    nativeTransfer,
    importAccount,
  };
}
