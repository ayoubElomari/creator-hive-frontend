import { useState } from "react";
import VideoButton from "./VideoButton";
import styles from "@/App.module.scss";

/* Icons */
import volumeIcon from "@/assets/icons/volume.svg";
import volumeCheckedIcon from "@/assets/icons/volume-checked.svg";
import videoDownloadIcon from "@/assets/icons/video-download.svg";
import videoDownloadCheckedIcon from "@/assets/icons/video-download-checked.svg";
import checkDoneIcon from "@/assets/icons/check-done.svg";
import checkDoneCheckedIcon from "@/assets/icons/check-done-checked.svg";

function VideoControls({ whenDone, copyToClipboard, getVideoRef, videoData }) {
  const [toCheck, setToCheck] = useState({
    download: false,
    done: false,
  });
  function handleDownload(videoUrl) {
    const link = document.createElement("a");
    link.href = videoUrl;
    link.download = videoData.filename || "video";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className={styles["video-controls"]}>
      <div className={styles["metadata-container"]}>
        <p
          className={styles["title"]}
          onClick={() => copyToClipboard(videoData.title)}
        >
          {videoData.title}
        </p>
        <p
          className={styles["tags"]}
          onClick={() => copyToClipboard(videoData.tags)}
        >
          {videoData.tags.length > 100
            ? `${videoData.tags.slice(0, 100)}...`
            : videoData.tags}
        </p>
      </div>
      <div className={styles["buttons-container"]}>
        <VideoButton
          icons={{
            base: volumeIcon,
            checked: volumeCheckedIcon,
          }}
          togglable={true}
          startChecked={true}
          onClick={() => {
            const videoRef = getVideoRef();
            if (videoRef) {
              videoRef.muted = !videoRef.muted;
            }
            return true;
          }}
        />
        <VideoButton
          icons={{
            base: videoDownloadIcon,
            checked: videoDownloadCheckedIcon,
          }}
          onClick={() => {
            setToCheck((prev) => ({ ...prev, download: true }));
            handleDownload(videoData.videoDownloadUrl);
            return true;
          }}
        />
        <VideoButton
          icons={{
            base: checkDoneIcon,
            checked: checkDoneCheckedIcon,
          }}
          onClick={() => {
            if (!toCheck.download) return false;
            setToCheck((prev) => ({ ...prev, done: true }));
            if (whenDone) whenDone();
            return true;
          }}
        />
      </div>
    </div>
  );
}

export default VideoControls;
