import { useRef, useEffect, useState } from "react";

export const VideoSnippet = ({ videoUid }) => {
  const videoRef = useRef(null);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleTimeUpdate = () => {
      // Stop at 5% of total duration
      if (video.currentTime >= duration * 0.05) {
        video.pause();
        video.currentTime = 0; // reset to start
        video.play(); // loop snippet
      }
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [duration]);

  return (
    <video
      ref={videoRef}
      src={`https://videodelivery.net/${videoUid}/manifest/video.m3u8`}
      controls
      autoPlay
      muted
      className="preview-img"
    />
  );
};
