import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { fetchVideos } from "@/api/drive";

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ creator, children }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    const initVideos = async () => {
      try {
        setLoading(true);
        const todayIso = new Date().toISOString().split("T")[0];
        const data = await fetchVideos({ date: todayIso });

        if (!ignore) {
          for (const video of data) {
            video.tags = video.tags
              .split(",")
              .map((tag) => `#${tag.trim()}`)
              .join(" ");
          }
          setVideos(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Failed to load videos");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    initVideos();

    return () => {
      ignore = true;
    };
  }, []);

  creator = useMemo(() => new Creator(creator), [creator]);
  const value = useMemo(
    () => ({ creator, videos, loading, error }),
    [creator, videos, loading, error]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export class Creator {
  constructor(creatorData) {
    this.displayName = creatorData.displayName;
    this.email = creatorData.email;
    this.tier = creatorData.tier;
    this.tierColor = Creator.getTierColor(this.tier);
  }

  static getTierId(tier) {
    const tierIds = {
      bronze: 1,
      silver: 2,
      gold: 3,
      platinum: 4,
      obsidian: 5,
    };
    return tierIds[tier.toLowerCase()] || 0; // Default to 0 if tier not found
  }

  static getTierColor(tier) {
    const tierColors = {
      bronze: "#CD7F32",
      silver: "#C0C0C0",
      gold: "#FFD700",
      platinum: "#00FFA1",
      obsidian: "#3F00D1",
    };
    if (typeof tier === "string") {
      return tierColors[tier.toLowerCase()] || "#ffffff"; // Default to white if tier not found
    }
    return Object.values(tierColors)[tier - 1] || "#ffffff"; // Default to white if tier not found
  }
}

export default AppContext;
