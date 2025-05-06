import { api } from "encore.dev/api";

export const test = api<void, { ok: boolean }>(
  { 
    method: "GET",
    path: "/test",
    expose: true
  },
  async () => {
    return { ok: true };
  }
);
