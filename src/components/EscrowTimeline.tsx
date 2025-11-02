import { useEffect, useState } from "react";
import { getEscrowEvents } from "../services/api";

interface Event {
  event_type: string;
  created_at: string;
  payload?: any;
}

export function EscrowTimeline({ escrowId }: { escrowId: string }) {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    getEscrowEvents(escrowId).then(setEvents);
  }, [escrowId]);

  return (
    <div>
      <h3>Escrow #{escrowId} Progress</h3>
      <ul>
        {events.map((e, i) => (
          <li key={i}>
            <strong>{e.event_type}</strong> at {new Date(e.created_at).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
