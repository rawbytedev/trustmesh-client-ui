import { useEffect, useState } from "react";
import { api } from "../services/api";

interface EventRow {
  key: string; // e.g. "lk:123"
  value: string; // JSON string per your storage layer
}

export function EscrowTimeline({ escrowId }: { escrowId: number }) {
  const [events, setEvents] = useState<EventRow[]>([]);

  useEffect(() => {
    (async () => {
      const res = await api.get(`/escrow/${escrowId}`);
      // server renders a page; better expose a JSON API:
      // GET /api/escrow/:id -> { timeline: { "ec:1": "...", "lk:1": "..." } }
    })();
  }, [escrowId]);

  return (
    <div>
      <h3>Escrow #{escrowId} Timeline</h3>
      <ul>
        {events.map((e, i) => (
          <li key={i}>
            <strong>{e.key}</strong>
            <pre>{e.value}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
}