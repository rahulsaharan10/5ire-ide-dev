import { Route, Routes, useNavigate } from "react-router-dom";
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
import ImportWallet from "./Pages/WelcomeScreens/ImportWallet";
import { useDispatch, useSelector } from "react-redux";
import ManageWallet from "./Components/Setting/ManageWallet.jsx";
import EnterPassword from "./Components/Setting/EnterPassword";
import SwapApprove from "./Pages/Swap/SwapApprove/SwapApprove";
import PrivateKey from "./Components/Setting/PrivateKey";
import UnlockWelcome from "./Pages/WelcomeScreens/UnlockWelcome";
import { useEffect, useState } from "react";
import RejectNotification from "./Pages/RejectNotification/RejectNotification";
import { setLogin } from "./Store/reducer/auth";

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function App() {

  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoding] = useState(true);


  const fetchLogin = () => {
    window.chrome.storage.session.get(["login"]).then((res) => {
      console.log("Login response from session :::::: ", res.login);
      dispatch(setLogin(res.login ? res.login : false));
      setLoding(false);
    });
  }

  useEffect(() => {
    const route = getParameterByName("route");
    console.log("Route : ",route);
    console.log("HERE ROUTE AND ", route, window.location.href);
    console.log("Auth.accounts : ", auth.accounts, "length : ", auth.accounts.length);
    if (route) {
      navigate("/" + route);
    } 
    else if (!(auth?.isLogin) &&( auth.accounts.length > 0)) {
      navigate("/unlockWallet");
    } 
    else if (auth?.isLogin) {
      navigate("/wallet");
    }
    fetchLogin();
  }, [auth?.login]);

  console.log("IS Login : ", auth?.isLogin);

  return (
    <div className="App">
      {
        loading ?
          <div>
            loading .....
          </div>
          :

          <Routes>
            {!auth?.isLogin ? (
              <>
                <Route
                  index
                  path="/"
                  element={<WelcomeLayout children={<WelcomeScreen />} />}
                />
                <Route
                  path="/importWallet"
                  element={<WelcomeLayout children={<ImportWallet />} />}
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
                  path="/unlockWallet"
                  element={<WelcomeLayout children={<UnlockWelcome />} />}
                />
                <Route
                  path="/importwallet"
                  element={<WelcomeLayout children={<ImportWallet />} />}
                />
                <Route
                  index
                  path="/rejectnotification"
                  element={<FixWidthLayout children={<RejectNotification />} />}
                />
                  <Route
                  index
                  path="/enter-password"
                  element={<OnlyContent children={<EnterPassword />} />}
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
                  path="/private-key"
                  element={<OnlyContent children={<PrivateKey />} />}
                />
              </>
            )}
          </Routes>
      }
    </div>
  );
}

export default App;
