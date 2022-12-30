import { Route, Routes } from "react-router-dom";
import "./App.scss";
import FixWidthLayout from "./Layout/FixWidthLayout";
import WelcomeLayout from "./Layout/WelcomeLayout";
import Defi from "./Pages/Defi/Defi";
import History from "./Pages/History/History";
import Setting from "./Pages/Setting/Setting";
import Wallet from "./Pages/Wallet/Wallet";
import CongratulationsScreen from "./Pages/WelcomeScreens/CongratulationsScreen";
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
          <Route index path="/defi" element={<Defi />} />
          <Route index path="/history" element={<History />} />
          <Route index path="/setting" element={<Setting />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
