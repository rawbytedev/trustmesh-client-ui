export async function getEscrowEvents(escrowId: string) {
  const res = await fetch(`https://trustmesh-server.up.railway.app/escrows/${escrowId}/events`);
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
}