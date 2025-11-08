import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import { prepareContractCall, sendAndConfirmTransaction } from "thirdweb";
import { CONTRACT, TrustmeshFunctions, usdccontract } from "../contract";
import { useState } from "react";
import { approve } from "thirdweb/extensions/erc20";


export function EscrowForm() {
  const { mutateAsync: sendTx, isPending } = useSendTransaction();
  const [seller, setSeller] = useState("");
  const [amount, setAmount] = useState("");
  const [holdDays, setHoldDays] = useState("3");
  const account = useActiveAccount();
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const expectedBy =
      Math.floor(Date.now() / 1000) + Number(holdDays) * 24 * 3600;

    const tx = prepareContractCall({
      contract: CONTRACT,
      method: TrustmeshFunctions.createEscrow,
      params: [seller, BigInt(amount), BigInt(expectedBy)],
    });
    const check = prompt("approve transfer? enter amount to confirm: ")
    if (check == null) {
      return
    }
    if (BigInt(check) != BigInt(amount)) {
        prompt("Incorrect amount")
        prompt("cancelling escrow")
        return     
      }
    

    const approveTx = approve({
      contract: usdccontract,
      spender: CONTRACT.address,
      amount: amount,
    })
    await sendAndConfirmTransaction({ transaction: approveTx, account });
    await sendAndConfirmTransaction({ transaction: tx, account });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="seller"
        placeholder="Seller address"
        value={seller}
        onChange={(e) => setSeller(e.target.value)}
        required
      />
      <input
        name="amount"
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        name="holdDays"
        placeholder="Hold days"
        type="number"
        value={holdDays}
        onChange={(e) => setHoldDays(e.target.value)}
      />
      <button type="submit" disabled={isPending}>Create Escrow</button>
    </form>
  );
}


