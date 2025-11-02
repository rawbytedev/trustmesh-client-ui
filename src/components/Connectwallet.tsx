import { createThirdwebClient } from "thirdweb";
import { ThirdwebProvider, ConnectButton } from "thirdweb/react";

const client = createThirdwebClient({ clientId: "YOUR_CLIENT_ID" });

export function ConnectWallet() {
  return (
    <ThirdwebProvider>
      <ConnectButton client={client} />
    </ThirdwebProvider>
  );
}