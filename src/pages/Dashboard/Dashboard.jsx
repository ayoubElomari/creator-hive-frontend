import React, { useEffect } from "react";
import styles from "./Dashboard.module.scss";
import "@/App.module.scss";
import { useAppContext, Creator } from "@/contexts/AppContext";

function Dashboard() {
  const { creator, videos, loading, error } = useAppContext();

  const nextTierId = Creator.getTierId(creator.tier) + 1;
  const nextTierColor = Creator.getTierColor(nextTierId);
  const customStyles = {
    "--creator-tier-color": creator.tierColor,
    "--bg-color-1": creator.tierColor + "08", // Adding transparency
    "--bg-color-2": nextTierColor + "08", // Adding transparency
  };

  useEffect(() => {
    Object.entries(customStyles).forEach(([key, value]) => {
      document.body.style.setProperty(key, value);
    });
  }, []);

  // Handle logout
  const handleLogout = () => {
    window.location.href = "/logout";
  };

  return (
    <div className={styles["dashboard-container"]} style={customStyles}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className={styles["dashboard-content"]}>
          <span>
            Welcome,{" "}
            <span className={styles["creator-name"]}>
              {creator.displayName}
            </span>
          </span>
          <p>You have {videos.length} videos for today.</p>

          <div className={styles["spacer"]}></div>
          <p className={styles["coming-soon"]}>The dashboard is coming soon!</p>

          <button className={styles["logout-btn"]} onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
