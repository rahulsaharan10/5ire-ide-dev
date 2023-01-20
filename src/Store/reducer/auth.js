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
  },
});

// Action creators are generated for each case reducer function
export const {
  setPassword,
  setCurrentAcc,
  setLogin,
  setAccountName,
  setAccounts,
  setPassError,
  setUIdata,
} = userSlice.actions;

export default userSlice.reducer;
