import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import { prepareContractCall, sendAndConfirmTransaction } from "thirdweb";
import { CONTRACT, TrustmeshFunctions } from "../contract";
import { api } from "../services/api";
import { EscrowForm } from "./EscrowForm";

export function EscrowActions({ escrowId }: { escrowId: bigint | number }) {
  const { mutateAsync: sendTx, isPending } = useSendTransaction();
  const account = useActiveAccount();
  async function handleLink() {
    const shipmentId = prompt("Enter shipment ID:");
    if (!shipmentId) return;
    const tx = prepareContractCall({
      contract: CONTRACT,
      method: TrustmeshFunctions.linkShipment,
      params: [BigInt(escrowId), shipmentId],
    });
    await sendAndConfirmTransaction({transaction: tx, account});
  }

  async function handleExpired() {
    const reason = prompt("Reason for expiry:");
    if (!reason) return;
    const tx = prepareContractCall({
      contract: CONTRACT,
      method: TrustmeshFunctions.markExpired,
      params: [BigInt(escrowId), reason],
    });
    await sendAndConfirmTransaction({transaction: tx, account});
  }
  async function handleCancel() {
    const reason = prompt("Reason for cancel:");
    if (!reason) return;
    const tx = prepareContractCall({
      contract: CONTRACT,
      method: TrustmeshFunctions.cancelUnlinked,
      params: [BigInt(escrowId), reason],
    });
    await sendAndConfirmTransaction({transaction: tx, account});
  }

  async function handleDispute() {
    await api.post("/dispute", { escrowId: Number(escrowId) });
  }

  async function handleRelease() {
    await api.post("/release", { escrowId: Number(escrowId) });
  }

  return (
    <div className="actions">
      <button onClick={handleLink} disabled={isPending}>Link Shipment</button>
      <button onClick={handleExpired} disabled={isPending}>Mark Expired</button>
      <button onClick={handleCancel} disabled={isPending}>Cancel Unlinked</button>
      <button onClick={handleDispute}>Dispute Escrow</button>
      <button onClick={handleRelease}>Release Funds</button>
    </div>
  );
}