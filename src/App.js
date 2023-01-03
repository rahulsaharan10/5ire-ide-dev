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

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<WelcomeLayout />}>
          <Route index path="/" element={<WelcomeScreen />} />
          <Route path="/setPassword" element={<SetPasswordScreen />} />
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
          <Route index path="/confirmCurrency" element={<SendConfirm />} />
          <Route index path="/buy" element={<Buy />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
