"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/store/useStore";

export function useAutoLogin() {
  const { setUser } = useStore();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        // Try existing session first
        const meRes = await fetch("/api/auth/me");
        if (meRes.ok) {
          const data = await meRes.json();
          if (data?.user) {
            setUser(data.user);
            setLoaded(true);
            return;
          }
        }

        // No session — auto-create demo user
        const demoRes = await fetch("/api/auth/demo", { method: "POST" });
        if (demoRes.ok) {
          const data = await demoRes.json();
          if (data?.user) {
            setUser(data.user);
          }
        }
      } catch {
        // continue without auth
      } finally {
        setLoaded(true);
      }
    }
    init();
  }, [setUser]);

  return loaded;
}
