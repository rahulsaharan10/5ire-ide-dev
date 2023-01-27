import { createSlice } from "@reduxjs/toolkit";

export const userState = {
  pass: null,

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
    testnet: "wss://wss-testnet.5ire.network/", //"https://chain-node.5ire.network"
  },

  balance: {
    evmBalance: 0,
    nativeBalance: 0,
  },

  currentNetwork: "testnet",

  accountName: "",

  isLogin: false,

  hash: null,

  passError: true,
  connectedSites: [],
  isLoading: false,
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

    setHash: (state, action) => {
      state.hash = action.payload;
    },

    setBalance: (state, action) => {
      if (action.payload.of === "evm")
        state.balance.evmBalance = action.payload.balance;
      else if (action.payload.of === "native")
        state.balance.nativeBalance = action.payload.balance;
    },

    setSite: (state, action) => {
      state?.connectedSites.push(action.payload);
    },
    toggleSite: (state, action) => {
      const siteIndex = state?.connectedSites.findIndex(
        (st) => (st.origin = action.payload)
      );
      if (siteIndex > -1) {
        state.connectedSites[siteIndex].isConnected =
          !state?.connectedSites[siteIndex].isConnected;
      }
    },
    toggleLoader: (state, action) => {
      state.isLoading = action.payload;
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
  setCurrentNetwork,
  setPassError,
  setUIdata,
  setBalance,
  setSite,
  toggleSite,
  toggleLoader,
} = userSlice.actions;

export default userSlice.reducer;
