import { Route, Routes } from "react-router-dom";
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
import CongratulationsScreen from "./Pages/WelcomeScreens/CongratulationsScreen";
import ManageWallet from "./Components/Setting/ManageWallet.jsx";
import EnterPassword from "./Components/Setting/EnterPassword";
import SwapApprove from "./Pages/Swap/SwapApprove/SwapApprove";
import PrivateKey from "./Components/Setting/PrivateKey";
import UnlockWelcome from "./Pages/WelcomeScreens/UnlockWelcome";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<WelcomeLayout />}>
          <Route index path="/" element={<WelcomeScreen />} />
          <Route path="/setPassword" element={<SetPasswordScreen />} />
          <Route path="/beforebegin" element={<Beforebegin />} />
          <Route path="/createwalletchain" element={<CreateWalletChain />} />
          <Route path="/createNewWallet" element={<CreateNewWallet />} />
          <Route path="/unlockWelcome" element={<UnlockWelcome />} />

        </Route>
        <Route path="" element={<FixWidthLayout />}>
          <Route index path="/wallet" element={<Wallet />} />
          <Route index path="/swapapprove" element={<SwapApprove />} />
        </Route>
        <Route path="/" element={<OnlyContent />}>
          <Route index path="/send" element={<Send />} />
          <Route index path="/swap" element={<Swap />} />          
          <Route index path="/manage-wallet" element={<ManageWallet/>} />
          <Route index path="/enter-password" element={<EnterPassword/>} />
          <Route index path="/private-key" element={<PrivateKey/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
