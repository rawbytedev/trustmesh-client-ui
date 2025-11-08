import { ConnectButton, ThirdwebProvider } from "thirdweb/react";
import { client, config } from "../config";
import { inAppWallet } from "thirdweb/wallets";

const wallets = [
    inAppWallet({
        auth:{
            options: [
                "google", "discord", "email","phone"
            ]
        }
    })
]
export function ConnectWallet() {
  return (
      <ConnectButton client={client} chain={config.chain} wallets={wallets} />
  );
}