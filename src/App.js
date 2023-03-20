import React, {useEffect, useState} from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import './index.css';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
// import { mainnet, polygon, optimism, arbitrum, goerli } from 'wagmi/chains';
import { goerli, polygonMumbai } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { useAccount } from 'wagmi'
import connectEther from './Contract/ether';
import ModalBox from "./Components/ModalBox";
import AdminDashboard from "./Pages/AdminDashboard";
// import { contract } from './Contract/ether';

const { chains, provider } = configureChains(
  // [mainnet, polygon, optimism, arbitrum, goerli],
  [polygonMumbai, goerli],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

function App() {
  const { address, isConnected, isDisconnected, isConnecting  } = useAccount();
  const [openModal, setOpenModal] = useState(false);
  useEffect(()=>{
    let contract;
    const callMethod = async() => {
      contract = await connectEther();
      const data = await contract.isUserRegistered(address);
      if(data===false){ 
        setOpenModal(true); 
        console.log(data);
      }
    }
    if(isConnected){
      callMethod();
    }
  },[isConnected, address, isDisconnected, isConnecting])

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
          {/* <ModalBox open={openModal} setOpen={setOpenModal} /> */}
          <ModalBox open={openModal} setOpen={setOpenModal} type="user-registration"/>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
