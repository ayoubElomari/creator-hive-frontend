import styles from "@/App.module.scss";
import { useState } from "react";

function VideoButton({
  label,
  icons,
  onClick,
  togglable = false,
  startChecked = false,
}) {
  const [isChecked, setIsChecked] = useState(startChecked);

  function handleClick() {
    if (onClick) {
      const result = onClick(isChecked);
      if (result) {
        if (togglable) {
          setIsChecked((prev) => !prev);
        } else {
          setIsChecked(true);
        }
      }
    }
  }

  return (
    <>
      <button className={styles["video-button"]} onClick={handleClick}>
        {icons.base && (
          <img
            src={isChecked ? icons.checked : icons.base}
            alt=""
            className={styles["video-button__icon"]}
          />
        )}
        {label && (
          <span className={styles["video-button__label"]}>{label}</span>
        )}
      </button>
    </>
  );
}
export default VideoButton;
