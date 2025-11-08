import { useActiveAccount, useContractEvents } from "thirdweb/react";
import { CONTRACT, Events} from "../contract";
import { EscrowForm } from "./EscrowForm";
import { EscrowActions } from "./EscrowActions";

export function EscrowDashboard() {
  const account = useActiveAccount();
  const address = account?.address?.toLowerCase();
  
  const { data: createdEvents } = useContractEvents({
    contract: CONTRACT,
    events: [Events.EscrowCreated],
  });

  const myEscrows =
    createdEvents?.filter((ev) => {
      const buyer = ev.data.buyer?.toLowerCase?.();
      const seller = ev.data.seller?.toLowerCase?.();
      return buyer === address || seller === address;
    }) ?? [];

  return (
    <div>
      <h2>My Escrows</h2>
      <ul>
        {myEscrows.map((e, i) => (
          <li key={i}>
            <strong>{e.args["escrowId"]}</strong>
            <pre>{e.args["seller"]}</pre>
            <pre>{e.args["amount"]}</pre>
            <EscrowActions escrowId={e.args["escrowId"]} />
          </li>
        ))}
      </ul>
      <EscrowForm />
    </div>
  );
}