import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Session } from "@/services/sessionService.ts";

type SessionState = {
  session?: Session;
  setSession: (session: Session) => void;
  clearSession: () => void;
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      session: undefined,
      setSession: (session) => set({ session }),
      clearSession: () => set({ session: undefined })
    }),
    {
      name: "aurora-travels:session"
    }
  )
);

