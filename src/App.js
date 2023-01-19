import { Route, Routes, useNavigate, useSearchParams, Navigate } from "react-router-dom";
import "./App.scss";
import FixWidthLayout from "./Layout/FixWidthLayout";
import OnlyContent from "./Layout/OnlyContent";
import WelcomeLayout from "./Layout/WelcomeLayout";
import Buy from "./Pages/Buy/Buy";
import Defi from "./Pages/Defi/Defi";
import History from "./Pages/History/History";
import Send from "./Pages/Send/Send";
import SendCoins from "./Pages/Send/SendCoins/SendCoins";
import SendConfirm from "./Pages/Send/SendConfirm/SendConfirm";
import Setting from "./Pages/Setting/Setting";
import Wallet from "./Pages/Wallet/Wallet";
import SetPasswordScreen from "./Pages/WelcomeScreens/SetPasswordScreen";
import WelcomeScreen from "./Pages/WelcomeScreens/WelcomeScreen";
import ImportPhrase from "./Pages/SecretPhrase/ImportPhrase";
import AddresBook from "./Pages/AddresBook/AddresBook";
import Manage from "./Pages/Manage/Manage";
import Swap from "./Pages/Swap/Swap";
import SwapDetails from "./Pages/Swap/SwapDetails/SwapDetails";
import CurrencyDetails from "./Pages/Wallet/CurrencyDetails/CurrencyDetails";
import CustomTocken from "./Pages/CustomTocken/CustomTocken";
import WalletName from "./Pages/WelcomeScreens/WalletName";
import WatchWallet from "./Pages/WelcomeScreens/WatchWallet";
import WatchAddress from "./Pages/WelcomeScreens/WatchAddress";
import SecretPhrasePaste from "./Pages/WelcomeScreens/SecretPhrasePaste";
import CreateNewWallet from "./Pages/WelcomeScreens/CreateNewWallet";
import EditWallet from "./Pages/EditWallet/EditWallet";
import ShowSecretPhrase from "./Pages/showSecretPhrase/ShowSecretPhrase";
import CurrencyPrefrence from "./Pages/CurrencyPrefrence/CurrencyPrefrence";
import Beforebegin from "./Pages/WelcomeScreens/Beforebegin";
import CreateWalletChain from "./Pages/WelcomeScreens/CreateWalletChain";
import CongratulationsScreen from "./Pages/WelcomeScreens/CongratulationsScreen";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLogin } from "./Store/reducer/counter";

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function App() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selector = useSelector(state => state.password);
  const [isLogin, setIsLogin] = useState(selector.isLogin);

  useEffect(() => {
    window.chrome.storage.local.clear();
    window.chrome.storage.local.get(["login"]).then(result => {

      console.log("On load reading state of login  : ", result.login);
      dispatch(setLogin(result.login ? true : false));
      
      setIsLogin(result.login ? true : false);
    });

    const type = getParameterByName("type");
    if (type === "helloworld") {
      navigate("/add-secret-phrase");
    }
  }, []);

  useEffect(() => {
    setIsLogin(selector.isLogin);
  }, [selector.isLogin]);

  console.log("isLogin : ", isLogin);
  
  return (
    <div className="App">
      {
        isLogin ?

          <Routes>
            <Route path="" element={<FixWidthLayout />}>

              {/* <Route exect path="/" element={<Navigate to="/wallet" />} /> */}

              <Route index path="/wallet" element={<Wallet />} />
              <Route exact path="/defi" element={<Defi />} />
              <Route exact path="/history" element={<History />} />
              <Route exact path="/setting" element={<Setting />} />
            </Route>

            <Route path="/" element={<OnlyContent />}>
              <Route index path="/send" element={<Send />} />
              <Route index path="/sendCurrency" element={<SendCoins />} />
              <Route path="/import-phrase" element={<ImportPhrase />} />
              <Route path="/address-book" element={<AddresBook />} />
              <Route index path="/confirmCurrency" element={<SendConfirm />} />
              <Route index path="/manage" element={<Manage />} />
              <Route index path="/buy" element={<Buy />} />
              <Route index path="/swap" element={<Swap />} />
              <Route index path="/swapDetails" element={<SwapDetails />} />
              <Route index path="/currencyDetails" element={<CurrencyDetails />} />
              <Route index path="/add-token" element={<CustomTocken />} />
              <Route index path="/editWalletName" element={<EditWallet />} />
              <Route
                index
                path="/showSecretPhrase"
                element={<ShowSecretPhrase />}
              />
              <Route
                index
                path="/currencyPreference"
                element={<CurrencyPrefrence />}
              />
            </Route>
          </Routes>
          :
          <Routes>
            <Route path="" element={<WelcomeLayout />}>
              <Route index path="/" element={<WelcomeScreen />} />
              <Route path="/setPassword" element={<SetPasswordScreen />} />
              {/* <Route path="/wallet-name" element={<WalletName />} /> */}
              <Route path="/watch-list" element={<WatchWallet />} />
              <Route path="/beforebegin" element={<Beforebegin />} />
              <Route path="/createwalletchain" element={<CreateWalletChain />} />
              <Route path="/address" element={<WatchAddress />} />
              <Route path="/add-secret-phrase" element={<SecretPhrasePaste />} />
              <Route path="/createNewWallet" element={<CreateNewWallet />} />
            </Route>
          </Routes>

      }

    </div>
  );
}

export default App;
