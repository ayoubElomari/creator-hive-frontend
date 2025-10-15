import styles from "@/App.module.scss";
import VideoScroll from "./VideoScroll";

function Home() {
  return (
    <div className={styles["home-container"]}>
      <div className={styles["link-to-dashboard"]}>
        <a href={"/dashboard"}>
          <img src="src/assets/icons/back-arrow.svg" alt="" />
          <span>Dashboard</span>
        </a>
      </div>
      <VideoScroll />
    </div>
  );
}

export default Home;
