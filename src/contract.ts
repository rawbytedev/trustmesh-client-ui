import { getContract, prepareEvent } from "thirdweb";
import { config, client } from "./config";

// Global contract instance
export const CONTRACT = getContract({
  client,
  chain: config.chain,
  address: config.contractAddress,
});

export const usdccontract = getContract({client,chain:config.chain,
  address: "0x3600000000000000000000000000000000000000",
});
// Full event signatures (type-safe)
export const Events = {
  EscrowCreated: prepareEvent({
    signature:
      "event EscrowCreated(uint256 indexed escrowId,address indexed buyer,address indexed seller,uint256 amount,uint256 expectedBy)",
  }),
  ShipmentLinked: prepareEvent({
    signature:
      "event ShipmentLinked(uint256 indexed escrowId,string shipmentId)",
  }),
  FundsReleased: prepareEvent({
    signature:
      "event FundsReleased(uint256 indexed escrowId,address seller,string shipmentId,string reason)",
  }),
  FundsRefunded: prepareEvent({
    signature:
      "event FundsRefunded(uint256 indexed escrowId,address buyer,string shipmentId,string reason)",
  }),
  EscrowExtended: prepareEvent({
    signature:
      "event EscrowExtended(uint256 indexed escrowId,uint256 extendedUntil,string shipmentId,string reason)",
  }),
  EscrowExpired: prepareEvent({
    signature: "event EscrowExpired(uint256 indexed escrowId,string reason)",
  }),
  EscrowCancelled: prepareEvent({
    signature: "event EscrowCancelled(uint256 indexed escrowId,string reason)",
  }),
};

// Function signatures (used by prepareContractCall)
export const TrustmeshFunctions = {
  createEscrow:
    "function createEscrow(address seller,uint256 amount,uint256 expectedBy)",
  linkShipment:
    "function linkShipment(uint256 escrowId,string shipmentId)",
  markExpired:
    "function markExpired(uint256 escrowId,string reason)",
  cancelUnlinked:
    "function cancelUnlinked(uint256 escrowId,string reason)",
};