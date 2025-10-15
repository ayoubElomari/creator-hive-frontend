import { useEffect, useRef, useState } from "react";
import CongratsScreen from "./CongratsScreen";
import VideoControls from "@/components/VideoControls";
import styles from "@/App.module.scss";
import { useAppContext } from "@/contexts/AppContext";
import { VideoPlayer } from "../../components/VideoPlayer";

function VideoScroll() {
  const { creator, videos, loading, error } = useAppContext();
  const scrollContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const videoRefs = useRef([]);

  function addRef(el) {
    if (el && !videoRefs.current.includes(el)) {
      videoRefs.current.push(el);
    }
  }

  const handleScroll = (e) => {
    const scrollPos = e.target.scrollTop;
    const index = Math.round(scrollPos / window.innerHeight);
    setActiveIndex(index);
    videoRefs.current.forEach((video, i) => {
      if (video) {
        if (i === index) {
          video.play().catch((err) => console.log(err));
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  };

  /* Video Check */
  function checkVideo(index) {
    // Scroll to the next video
    if (index < videos.length - 1) {
      scrollContainerRef.current.scrollTo({
        top: (index + 1) * window.innerHeight,
        behavior: "smooth",
      });
    }
    setActiveIndex((prev) => Math.min(prev + 1, videos.length - 1));
    console.log("Video at index", index, "checked.");
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  }
  return (
    <div
      className={styles["video-scroll-area"]}
      style={{ "--creator-tier-color": creator.tierColor }}
    >
      <div
        style={{
          height: "100vh",
          overflowY: "scroll",
          scrollSnapType: "y mandatory",
        }}
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        {loading ? (
          <div className={styles["loading-videos-screen"]}>Loading...</div>
        ) : error ? (
          <div className={styles["error-videos-screen"]}>
            Error loading videos: {error}
          </div>
        ) : videos.length ? (
          videos.map((videoData, index) => (
            <div
              key={index}
              style={{
                height: "100vh",
                scrollSnapAlign: "start",
                position: "relative",
              }}
              className={styles["video-container"]}
            >
              <VideoPlayer
                src={videoData.videoUrl}
                play={index === activeIndex}
                setRef={addRef}
              />

              <VideoControls
                whenDone={() => checkVideo(index)}
                copyToClipboard={copyToClipboard}
                getVideoRef={() => videoRefs.current[index]}
                videoData={videoData}
              />
            </div>
          ))
        ) : (
          <CongratsScreen />
        )}
      </div>

      <div
        className={`${styles["copied-message"]} ${
          copied ? styles["visible"] : ""
        }`}
      >
        Copied to clipboard!
      </div>
      <div className={styles["creator-badge"]}>
        <span className={styles["creator-id"]}>{creator.displayName}</span>
        <div className={styles["separator"]}></div>
        <span
          className={styles["creator-tier"]}
          style={{ color: creator.tierColor }}
        >
          {creator.tier}
        </span>
      </div>
    </div>
  );
}

export default VideoScroll;
