import { createSlice } from "@reduxjs/toolkit";
import { action } from "webextension-polyfill";

export const userState = {
  pass: "",

  accounts: [],

  currentAccount: {
    accountName: "",
    mnemonic: "",
    evmPrivatekey: "",
    evmAddress: "",
    nativeAddress: "",
  },
  uiData: {},

  availableNetworks: {
    qa: "wss://qa-wss-nodes.5ire.network",
    testnet: "https://chain-node.5ire.network"
  },

  balance: {
    evmBalance: 0,
    nativeBalance: 0
  },

  currentNetwork: "testnet",

  accountName: "",

  isLogin: false,

  passError: true,
};

export const userSlice = createSlice({
  name: "auth",
  initialState: userState,
  reducers: {
    setPassword: (state, action) => {
      state.pass = action.payload;
    },

    setCurrentAcc: (state, action) => {
      state.currentAccount = action.payload;
    },

    setAccounts: (state, action) => {
      state.accounts.push(action.payload);
    },

    setLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setUIdata: (state, action) => {
      state.uiData = action.payload;
    },

    setAccountName: (state, action) => {
      state.accountName = action.payload;
    },

    setPassError: (state, action) => {
      state.passError = action.payload;
    },

    setCurrentNetwork: (state, action) => {
      state.currentNetwork = action.payload;
    },

    setBalance: (state, action) => {
      if (action.payload.of === "evm")
        state.balance.evmBalance = action.payload.balance;

      else if (action.payload.of === "native")
        state.balance.nativeBalance = action.payload.balance;
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  setPassword,
  setCurrentAcc,
  setLogin,
  setAccountName,
  setAccounts,
  setCurrentNetwork,
  setPassError,
  setUIdata,
  setBalance,
} = userSlice.actions;

export default userSlice.reducer;
