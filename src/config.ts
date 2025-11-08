import { createThirdwebClient } from "thirdweb";
import { arcTestnet } from "thirdweb/chains";

export const config = {
  clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID, // set in .env
  chain: arcTestnet,
  contractAddress: import.meta.env.VITE_CONTRACT_ADDRESS,
};

export const client = createThirdwebClient({ clientId: config.clientId });