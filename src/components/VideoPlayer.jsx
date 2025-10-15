import { useState, useRef, useEffect } from "react";
import styles from "@/App.module.scss";

export function VideoPlayer({ src, play = false, setRef = null }) {
  const [buffering, setBuffering] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (play) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [play]);

  useEffect(() => {
    if (setRef) {
      setRef(videoRef.current);
    }
  }, [setRef]);

  return (
    <div className={styles["video-player-container"]}>
      {/* Buffering Loader UI */}
      {buffering && (
        <div className={styles["buffering-loader"]}>
          <div className={styles["loader"]}></div>
        </div>
      )}

      {/* 🎥 Video element */}
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        webkit-playsinline="true"
        preload="metadata"
        download="true"
        controls={false}
        className={styles["video-element"]}
        onWaiting={() => setBuffering(true)}
        onStalled={() => setBuffering(true)}
        onSeeking={() => setBuffering(true)}
        onCanPlay={() => setBuffering(false)}
        onPlaying={() => setBuffering(false)}
        onClick={() => {
          const vid = videoRef.current;
          if (vid) {
            vid.paused ? vid.play() : vid.pause();
          }
        }}
      />
    </div>
  );
}
