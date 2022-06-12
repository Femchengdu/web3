
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Proposal from "./pages/Proposal";
import { ConnectButton } from "web3uikit";
import passyLogo from "./images/passyLogo.png";
import console from 'console-browserify'


function App() {
  return (
    <>
      <div className="header">
        <img width="160px" src={passyLogo} alt="logo" />
        <ConnectButton />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proposal/" elwement={<Proposal />} />
      </Routes>
    </>
  );
}

export default App;
