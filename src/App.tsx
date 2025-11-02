import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { ConnectWallet } from "./components/Connectwallet";
import { EscrowTimeline } from "./components/EscrowTimeline";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>TrustMesh Dashboard</h1>
      <ConnectWallet />
      <EscrowTimeline escrowId="ID" />
    </div>
  );
}


export default App
