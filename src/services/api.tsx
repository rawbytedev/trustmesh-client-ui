import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL ?? "http://localhost:8000",
});

export async function disputeEscrow(escrowId: number) {
  return api.post("/dispute", { escrowId });
}

export async function releaseFunds(escrowId: number) {
  return api.post("/release", { escrowId });
}