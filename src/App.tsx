import { ThirdwebProvider, useActiveAccount } from "thirdweb/react";
import "./App.css";
import { ConnectWallet } from "./components/ConnectWallet";
import { EscrowDashboard } from "./components/EscrowDashboard";
import type { useActionState } from "react";

export default function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>TrustMesh Dashboard</h1>
      <ThirdwebProvider>
      <Login />
      </ThirdwebProvider>
    </div>
  );
}

export function Login() {
  const address = useActiveAccount();
  if (!address) {
    return (<div>Please connect your wallet to continue.
            <ConnectWallet />
            </div>
    );
  }
  return (
  <div>Welcome, {address.address}
    <ConnectWallet />
    <EscrowDashboard />
  </div>
  );
}