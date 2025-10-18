import { useEffect, useState } from "react";
import { me } from "@/api/auth";

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function check() {
      try {
        const data = await me();

        if (data.authenticated) {
          setUser(data); // Contains email + google_id
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Failed to check auth", err);
        setUser(null);
      }
      setLoading(false);
    }
    check();
  }, []);

  return { user, loading };
}
