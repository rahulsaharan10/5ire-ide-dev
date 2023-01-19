import { Route, Routes, useNavigate } from "react-router-dom";
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

import CreateNewWallet from "./Pages/WelcomeScreens/CreateNewWallet";
import EditWallet from "./Pages/EditWallet/EditWallet";
import ShowSecretPhrase from "./Pages/showSecretPhrase/ShowSecretPhrase";
import CurrencyPrefrence from "./Pages/CurrencyPrefrence/CurrencyPrefrence";
import Beforebegin from "./Pages/WelcomeScreens/Beforebegin";
import CreateWalletChain from "./Pages/WelcomeScreens/CreateWalletChain";
import { useEffect } from "react";

import ManageWallet from "./Components/Setting/ManageWallet.jsx";
import EnterPassword from "./Components/Setting/EnterPassword";
import SwapApprove from "./Pages/Swap/SwapApprove/SwapApprove";
import PrivateKey from "./Components/Setting/PrivateKey";
import { useSelector } from "react-redux";

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
  const st = useSelector((state) => state);
  console.log("HHHHH", st);
  const isLogin = useSelector((state) => state?.counter?.login);
  useEffect(() => {
    const type = getParameterByName("type");

    if (type === "helloworld") {
      navigate("/add-secret-phrase");
    }
  }, []);
  return (
    <div className="App">
      <Routes>
        {!isLogin ? (
          <Route path="" element={<WelcomeLayout />}>
            <Route index path="/" element={<WelcomeScreen />} />
            <Route path="/setPassword" element={<SetPasswordScreen />} />
            <Route path="/beforebegin" element={<Beforebegin />} />
            <Route path="/createwalletchain" element={<CreateWalletChain />} />
            <Route path="/createNewWallet" element={<CreateNewWallet />} />
          </Route>
        ) : (
          <>
            <Route path="" element={<FixWidthLayout />}>
              <Route index path="/" element={<Wallet />} />
              <Route index path="/swapapprove" element={<SwapApprove />} />
              <Route path="/defi" element={<Defi />} />
              <Route path="/history" element={<History />} />
              <Route path="/setting" element={<Setting />} />
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
              <Route
                index
                path="/currencyDetails"
                element={<CurrencyDetails />}
              />
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

              <Route index path="/manage-wallet" element={<ManageWallet />} />
              <Route index path="/enter-password" element={<EnterPassword />} />
              <Route index path="/private-key" element={<PrivateKey />} />
            </Route>
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
