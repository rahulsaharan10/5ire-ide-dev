import { createSlice } from "@reduxjs/toolkit";

// let loginDetails = false;
// (async () => {
//   loginDetails = await window.chrome.storage.local.get(["login"]);
// })();


export const userSlice = createSlice({
  name: "password",
  initialState: {

    pass:"",

    accDetails:{
      mnemonic:"",
      evmPrivatekey:"",
      evmAddress:"",
      nativeAddress:""
    },

    isLogin: false

  },
  reducers: {
    setPassword: (state, action) => {
      state.pass = action.payload;
    },

    setAccountDetails : (state,action)=>{
      state.accDetails = action.payload;
    },

    setLogin : (state, action) => {
      state.isLogin = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const { setPassword,setAccountDetails, setLogin } = userSlice.actions;

export default userSlice.reducer;
