import styles from "@/App.module.scss";
import VideoScroll from "./VideoScroll";

/* Icons */
import backArrowIcon from "@/assets/icons/back-arrow.svg";

function Home() {
  return (
    <div className={styles["home-container"]}>
      <div className={styles["link-to-dashboard"]}>
        <a href={"/dashboard"}>
          <img src={backArrowIcon} alt="" />
          <span>Dashboard</span>
        </a>
      </div>
      <VideoScroll />
    </div>
  );
}

export default Home;
