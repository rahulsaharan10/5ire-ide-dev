import { createSlice } from "@reduxjs/toolkit";

export const userState = {
  pass: "",

  accDetails: {
    mnemonic: "",
    evmPrivatekey: "",
    evmAddress: "",
    nativeAddress: "",
  },

  isLogin: false,
};

export const userSlice = createSlice({
  name: "auth",
  initialState: userState,
  reducers: {
    setPassword: (state, action) => {
      state.pass = action.payload;
    },

    setAccountDetails: (state, action) => {
      state.accDetails = action.payload;
    },

    setLogin: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPassword, setAccountDetails, setLogin } = userSlice.actions;

export default userSlice.reducer;
