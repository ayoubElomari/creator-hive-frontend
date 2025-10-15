import { useState } from "react";
import VideoButton from "./VideoButton";
import styles from "@/App.module.scss";

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
            base: "src/assets/icons/volume.svg",
            checked: "src/assets/icons/volume-checked.svg",
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
            base: "src/assets/icons/video-download.svg",
            checked: "src/assets/icons/video-download-checked.svg",
          }}
          onClick={() => {
            setToCheck((prev) => ({ ...prev, download: true }));
            handleDownload(videoData.videoDownloadUrl);
            return true;
          }}
        />
        <VideoButton
          icons={{
            base: "src/assets/icons/check-done.svg",
            checked: "src/assets/icons/check-done-checked.svg",
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
