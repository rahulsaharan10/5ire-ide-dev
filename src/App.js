import { Route, Routes, useNavigate,RouterProvider } from "react-router-dom";
import "./App.scss";
import FixWidthLayout from "./Layout/FixWidthLayout";
import OnlyContent from "./Layout/OnlyContent";
import WelcomeLayout from "./Layout/WelcomeLayout";
import Send from "./Pages/Send/Send";
import Wallet from "./Pages/Wallet/Wallet";
import SetPasswordScreen from "./Pages/WelcomeScreens/SetPasswordScreen";
import WelcomeScreen from "./Pages/WelcomeScreens/WelcomeScreen";
import Swap from "./Pages/Swap/Swap";
import CreateNewWallet from "./Pages/WelcomeScreens/CreateNewWallet";
import Beforebegin from "./Pages/WelcomeScreens/Beforebegin";
import CreateWalletChain from "./Pages/WelcomeScreens/CreateWalletChain";
import { useSelector } from "react-redux";

import ManageWallet from "./Components/Setting/ManageWallet.jsx";
import EnterPassword from "./Components/Setting/EnterPassword";
import SwapApprove from "./Pages/Swap/SwapApprove/SwapApprove";
import PrivateKey from "./Components/Setting/PrivateKey";
import UnlockWelcome from "./Pages/WelcomeScreens/UnlockWelcome";
import { useEffect } from "react";

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function App() {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    const route = getParameterByName("route");
    console.log("HERE ROUTE AND ", route, window.location.href);
    if (route) {
      navigate("/" + route);
    } else if (auth?.isLogin) {
      navigate("/wallet");
    }
  }, []);
  console.log("isLogin : ", auth);

  return (
    <div className="App">
      <Routes >
        
        {!auth?.isLogin ? (
          <>
            <Route
            
              index
              path="/"
              element={<WelcomeLayout children={<WelcomeScreen />} />}
            />
            <Route
              path="/setPassword"
              element={<WelcomeLayout children={<SetPasswordScreen />} />}
            />
            <Route
              path="/beforebegin"
              element={<WelcomeLayout children={<Beforebegin />} />}
            />
            <Route
              path="/createwalletchain"
              element={<WelcomeLayout children={<CreateWalletChain />} />}
            />
            <Route
              path="/createNewWallet"
              element={<WelcomeLayout children={<CreateNewWallet />} />}
            />
            <Route
              path="/unlockWelcome"
              element={<WelcomeLayout children={<UnlockWelcome />} />}
            />
          </>
        ) : (
          <>
            <Route
              index
              path="/wallet"
              element={<FixWidthLayout children={<Wallet />} />}
            />
            <Route
              index
              path="/swapapprove"
              element={<FixWidthLayout children={<SwapApprove />} />}
            />
            <Route
              index
              path="/send"
              element={<OnlyContent children={<Send />} />}
            />
            <Route
              index
              path="/swap"
              element={<OnlyContent children={<Swap />} />}
            />

            <Route
              index
              path="/manage-wallet"
              element={<OnlyContent children={<ManageWallet />} />}
            />
            <Route
              index
              path="/enter-password"
              element={<OnlyContent children={<EnterPassword />} />}
            />
            <Route
              index
              path="/private-key"
              element={<OnlyContent children={<PrivateKey />} />}
            />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
