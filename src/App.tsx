import { configureWeb3Modal } from "./connection";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/landingPage/home";
import Feed from "./pages/dashboard/feed";
import Subscription from "./pages/dashboard/subscription";
import Analytics from "./pages/dashboard/analytics";
import Overview from "./pages/DAOdashboard/Overview";
import Proposals from "./pages/DAOdashboard/Proposals";
import Voting from "./pages/DAOdashboard/Voting";
import Treasury from "./pages/DAOdashboard/Treasury";
import AboutUs from "./pages/landingPage/about-us";
import Support from "./pages/landingPage/support";

configureWeb3Modal();

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/support" element={<Support />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/proposals" element={<Proposals />} />
          <Route path="/voting" element={<Voting />} />
          <Route path="/treasury" element={<Treasury />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
