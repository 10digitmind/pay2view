import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

const VideoPlayer = ({ videoSrc }) => {
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    const markReady = () => {
      setVideoReady(true);
      console.log("Video is ready to play!");
    };

    // ---------- HLS case ----------
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, markReady);

      return () => {
        hls.destroy();
      };
    } 
    // ---------- Native HTML5 fallback ----------
    else {
      video.src = videoSrc;

      // Fires when enough metadata is loaded (duration, videoWidth/Height)
      video.addEventListener("loadedmetadata", markReady);

      // Fires when video can start playing
      video.addEventListener("canplay", markReady);

      return () => {
        video.removeEventListener("loadedmetadata", markReady);
        video.removeEventListener("canplay", markReady);
      };
    }
  }, [videoSrc]);

  return (
    <div>
      {!videoReady && <div className="placeholder">Video loading...</div>}
      <video
        ref={videoRef}
        className="video-player"
        controls
        autoPlay={false}
        muted
        width="100%"
      />
    </div>
  );
};

export default VideoPlayer;
