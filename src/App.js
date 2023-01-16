import { Route, Routes } from "react-router-dom";
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
import SecretPhrasePaste from "./Pages/WelcomeScreens/SecretPhrasePaste"
import CreateNewWallet from "./Pages/WelcomeScreens/CreateNewWallet";
import EditWallet from "./Pages/EditWallet/EditWallet";
import ShowSecretPhrase from "./Pages/showSecretPhrase/ShowSecretPhrase";
import CurrencyPrefrence from "./Pages/CurrencyPrefrence/CurrencyPrefrence";
import Beforebegin from "./Pages/WelcomeScreens/Beforebegin";
import CreateWalletChain from "./Pages/WelcomeScreens/CreateWalletChain";
import CongratulationsScreen from "./Pages/WelcomeScreens/CongratulationsScreen";
function App() {
  return (
    <div className="App">
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
        <Route path="" element={<FixWidthLayout />}>
          <Route index path="/wallet" element={<Wallet />} />
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
          <Route index path="/currencyDetails" element={<CurrencyDetails />} />
          <Route index path="/add-token" element={<CustomTocken />} />
          <Route index path="/editWalletName" element={<EditWallet />} />
          <Route index path="/showSecretPhrase" element={<ShowSecretPhrase />} />
          <Route index path="/currencyPreference" element={<CurrencyPrefrence />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
