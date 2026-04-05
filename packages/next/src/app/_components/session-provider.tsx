"use client";

import {
  useBetterAuthSession,
  type AuthClientSession,
} from "@repo/lib/auth/client";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useIsMounted } from "./useisMounted";

type AuthSession = typeof AuthClientSession;

type SessionContextType = {
  isPending: boolean;
  data: AuthSession | null;
};

const SessionContext = createContext<SessionContextType | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [isPending, setIsPending] = useState(true);
  const [data, setData] = useState<AuthSession | null>(null);
  const isMounted = useIsMounted();

  const onUpdate = useCallback(
    (pending: boolean, nextData: AuthSession | null) => {
      setIsPending(pending);
      setData(nextData);
    },
    [],
  );

  return (
    <SessionContext value={{ isPending, data }}>
      {children}
      {isMounted && <SessionBridge onUpdate={onUpdate} />}
    </SessionContext>
  );
}

function SessionBridge({
  onUpdate,
}: {
  onUpdate: (isPending: boolean, data: AuthSession | null) => void;
}) {
  const { isPending: betterAuthIsPending, data: betterAuthData } =
    useBetterAuthSession();

  useEffect(() => {
    onUpdate(betterAuthIsPending, betterAuthData ?? null);
  }, [betterAuthIsPending, betterAuthData, onUpdate]);

  return null;
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context)
    throw new Error("useSession must be used within a SessionProvider");
  return context;
}
