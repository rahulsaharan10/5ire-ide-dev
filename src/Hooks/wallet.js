import { useState, useEffect } from "react";
import {
    mnemonicGenerate,
    mnemonicToMiniSecret,
    mnemonicValidate,
    ed25519PairFromSeed,
    cryptoWaitReady,
} from "@polkadot/util-crypto";
import { u8aToHex } from "@polkadot/util";
import { waitReady } from "@polkadot/wasm-crypto";
import { ApiPromise } from "@polkadot/api";
import { HttpProvider, WsProvider } from "@polkadot/rpc-provider";
import { ethers } from "ethers";
import { useSelector, useDispatch } from "react-redux";
import { QA_NETWORK, TEST_NETWORK } from "../Constants/index";
import { decodeAddress, encodeAddress } from "@polkadot/keyring";
import { Keyring } from "@polkadot/keyring";
import { setCurrentAcc, setAccounts, setLogin, setBalance } from "../Store/reducer/auth";
import { setAccountName } from "../Store/reducer/auth";
import Web3 from "web3";


export default function Wallet() {

    const dispatch = useDispatch();
    const { currentAccount, availableNetworks, currentNetwork } = useSelector((state) => state?.auth);
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
        if (currentNetwork === TEST_NETWORK)
            setUpApi(availableNetworks?.testnet);
        else if (currentNetwork === QA_NETWORK)
            setUpApi(availableNetworks?.qa);

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
            const w3balance = await evmApi?.eth.getBalance(currentAccount?.evmAddress);
            let payload = {
                of: "evm",
                balance: parseInt(Number(w3balance) / Math.pow(10, 18)),
            };
            console.log("evm balance : ", parseInt(Number(w3balance) / Math.pow(10, 18)));
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
        console.log("nativeBalance : ", parseInt(Number(nbalance.availableBalance) / Math.pow(10, 18)));

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
                nonce: await evmApi.eth.getTransactionCount(currentAccount?.evmAddress, "pending"),
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
            if (hash) return {
                error: false,
                data: hash
            }
            else return {
                error: true,
                data: "transaction failed!"
            }

        } catch (error) {
            console.log("Error : ", error);
            return {
                error: true,
                data: "Error occured while sending!"
            }
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

            if (hash) return {
                error: false,
                data: hash
            }
            else return {
                error: true,
                data: "transaction failed!"
            }

        } catch (error) {
            console.log("Error : ", error);
            return {
                error: true,
                data: "Error occured while sending!"
            }
        }
    };

    const nativeToEvmSwap = async (amount) => {
        try {
            console.log("nativeToEvmSwap Amount", amount);
            if (amount) {
                amount = Number(
                    Math.round(Number(amount) * Math.pow(10, 18) * 100) / 100
                ).toString();

                const seedAlice = mnemonicToMiniSecret(currentAccount.mnemonic);
                const keyring = new Keyring({ type: "ed25519" });
                const alice = keyring.addFromPair(ed25519PairFromSeed(seedAlice));

                let deposit = await nativeApi.tx.evm.deposit(currentAccount?.evmAddress, amount);
                const transferRes = await deposit.signAndSend(alice);
                console.log(transferRes.toHex());
                const tx = transferRes.toHex();

                if (tx) {
                    return {
                        error: false,
                        data: tx
                    }
                } else {
                    return {
                        error: true,
                        data: "error"
                    }
                }

            } else {
                return {
                    error: true,
                    data: "error"
                }
            }

        } catch (error) {
            console.log("Error : ", error);
            return {
                error: true,
                data: "Error occured while swapping!"
            }
        }
    };

    const evmToNativeSwap = async (amount) => {
        try {
            if (amount) {
                console.log("evmToNativeSwap Amount", amount);

                const seedAlice = mnemonicToMiniSecret(currentAccount.mnemonic);
                const keyring = new Keyring({ type: "ed25519" });
                const alice = keyring.addFromPair(ed25519PairFromSeed(seedAlice));

                amount = Number(
                    Math.round(Number(amount) * Math.pow(10, 18) * 100) / 100
                ).toString();
                const publicKey = u8aToHex(alice.publicKey);
                const transaction = {
                    to: publicKey.slice(0, 42),
                    value: amount.toString(),
                    gas: 21000,
                    nonce: await evmApi.eth.getTransactionCount(currentAccount?.evmAddress),
                };

                const signedTx = await evmApi.eth.accounts.signTransaction(
                    transaction,
                    currentAccount?.evmPrivatekey
                );

                let txHash;

                const isSuccess = await evmApi.eth.sendSignedTransaction(
                    signedTx.rawTransaction,
                    async function (error, hash) {

                        if (!error) {
                            txHash = hash;
                            return 1;
                        } else {
                            return 0;
                        }
                    }
                );

                if (isSuccess) {

                    const withdraw = await nativeApi.tx.evm.withdraw(
                        publicKey.slice(0, 42),
                        amount.toString()
                    );

                    await withdraw.signAndSend(alice);

                }
                if (txHash) {
                    return {
                        error: false,
                        data: txHash
                    }
                }
                else {
                    return {
                        error: true,
                        data: "error occured while swapping!"
                    }
                }

            }
            else {
                return {
                    error: true,
                    data: "error occured while swapping!"
                }
            }

        } catch (error) {
            console.log("Error : ", error);
            return {
                error: true,
                data: "Error occured while swapping!"
            }
        }
    }

    const importAccount = async (data) => {

        try {
            dispatch(setAccountName(data.accName));

            console.log("data");

            const SS58Prefix = 6;
            const isValidMnemonic = mnemonicValidate(data.key);
            console.log("Is mnemonics is valid: ", isValidMnemonic);

            if (isValidMnemonic) {

                // Create valid Substrate-compatible seed from mnemonic
                const seedAlice = mnemonicToMiniSecret(data.key);

                // Generate new public/secret keypair for Alice from the supplied seed
                const { publicKey } = ed25519PairFromSeed(seedAlice);

                const address = encodeAddress(decodeAddress(publicKey, SS58Prefix));
                const ethAddress = ethers.Wallet.fromMnemonic(data.key);

                const payload = {
                    accountName: data.accName,
                    mnemonic: data.key,
                    nativeAddress: address,
                    evmAddress: ethAddress.address,
                    evmPrivatekey: ethAddress.privateKey,
                };
                dispatch(setCurrentAcc(payload));
                dispatch(setAccounts(payload));

                return {
                    error: false,
                    data: "success"
                }

            } else
                return {
                    error: true,
                    data: "Invalid mnemonic!"
                }

        } catch (error) {
            console.log("Error : ", error);
            return {
                error: true,
                data: "Something went wrong!"
            }
        }
    };

    const retriveEvmFee = async (toAddress, amount) => {
        try {

            toAddress = toAddress ? toAddress : currentAccount?.nativeAddress;

            if (toAddress.startsWith("5")) toAddress = (u8aToHex(toAddress)).slice(0, 42);

            const gasAmount = await evmApi.eth.estimateGas({
                to: toAddress,
                from: currentAccount?.evmAddress,
                value: amount
            })
            const gasPrice = await evmApi.eth.getGasPrice();
            let fee = (Number(gasPrice * gasAmount / 10 ** 18));
            return fee ? fee : 0;

        }
        catch (error) {
            console.log("error", error.toString())
            return 0;
        }
    }

    const retriveNativeFee = async (toAddress, amount) => {
        try {

            toAddress = toAddress ? toAddress : currentAccount?.evmAddress;
            let transferTx;
            const keyring = new Keyring({ type: "ed25519" });
            const seedAlice = mnemonicToMiniSecret(currentAccount?.mnemonic);
            console.log("Seed Alice : ", seedAlice);
            const alice = keyring.addFromPair(ed25519PairFromSeed(seedAlice));

            amount = Number(
                Math.round(Number(amount) * Math.pow(10, 18) * 100) / 100
            )
            if (toAddress.startsWith("0x")) {
                transferTx = await nativeApi.tx.evm.deposit(
                    toAddress,
                    amount.toString()
                );

            }
            if (toAddress.startsWith("5")) {
                transferTx = nativeApi.tx.balances.transferKeepAlive(
                    toAddress,
                    amount.toString()
                )
            }

            const info = await transferTx?.paymentInfo(alice);
            const adjFee = info?.partialFee;
            const fee = Number(adjFee) / Math.pow(10, 18);
            console.log("Fee : ", fee);

            return fee ? fee : 0;

        } catch (error) {
            console.log("Error : ", error);
            return 0;
        }
    }


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
        nativeToEvmSwap,
        evmToNativeSwap,
        retriveEvmFee,
        retriveNativeFee
    };
}
