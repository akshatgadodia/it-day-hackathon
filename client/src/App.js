import React, {useEffect} from "react";
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
import { goerli, mainnet } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { useAccount } from 'wagmi'

const { chains, provider } = configureChains(
  // [mainnet, polygon, optimism, arbitrum, goerli],
  [goerli, mainnet],
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
  const { address, isConnected } = useAccount();

  useEffect(()=>{
    if(isConnected){
      alert(address);
    }
  },[isConnected])
  
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
