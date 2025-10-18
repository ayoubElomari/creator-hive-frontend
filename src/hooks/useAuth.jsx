import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function checkAuth(retry = false) {
    try {
      const res = await fetch("/api/me", { credentials: "include" });
      const data = await res.json();

      if (data.authenticated) {
        setUser(data);
        setLoading(false);
      } else {
        if (!retry) {
          // ✅ Retry once after a delay (helps with incognito cookie propagation)
          setTimeout(() => checkAuth(true), 350);
        } else {
          // ✅ Final attempt failed
          setUser(null);
          setLoading(false);
        }
      }
    } catch (err) {
      setUser(null);
      setLoading(false);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return { user, loading };
}
