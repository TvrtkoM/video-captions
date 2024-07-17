import { useCallback, useRef, useState } from "react";
import useCaptions from "../hooks/useCaptions";
import VideoCaptions from "./VideoCaptions";
import "./VideoPlayer.css";
import { VideoPlayerContext } from "./VideoPlayerContext";
import VideoTranscript from "./VideoTranscript";
import { Caption } from "../types";
import useWindowResize from "../hooks/useWindowResize";
import VideoCaptionsStyling from "./VideoCaptionsStyling";

type VideoPlayerProps = {
  clipSrc: string;
  captionsSrc: string;
};

const VideoPlayer = ({ clipSrc, captionsSrc }: VideoPlayerProps) => {
  const [currentSecond, setCurrentSecond] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { data: captions } = useCaptions(captionsSrc);

  const [videoWidth, setVideoWidth] = useState<number>();

  const [captionBackground, setCaptionBackground] = useState<string>("#ffffff");
  const [captionForeground, setCaptionForeground] = useState<string>("#000000");

  const setCaptionStyle = (background: string, foreground: string) => {
    setCaptionForeground(foreground);
    setCaptionBackground(background);
  };

  const windowResizeHandler = useCallback(() => {
    const scrollBarWidth = window.innerWidth - document.body.offsetWidth;
    const videoWidth =
      window.innerWidth <= 1100
        ? window.innerWidth - scrollBarWidth
        : window.innerWidth * (2 / 3);
    setVideoWidth(videoWidth);
  }, []);

  useWindowResize(windowResizeHandler);

  const currentCaption = captions.find((cap) => {
    return currentSecond >= cap.timeStart && currentSecond < cap.timeEnd;
  });

  const onTranscriptClick = (caption: Caption) => {
    if (videoRef.current == null) {
      return;
    }
    videoRef.current.currentTime = caption.timeStart;
  };

  return (
    <section className="videoPlayerWrap">
      <VideoPlayerContext.Provider
        value={{
          captions,
          currentSecond,
          currentCaption,
          onTranscriptClick,
          captionBackground,
          captionForeground,
          setCaptionStyle
        }}
      >
        <div className="videoPlayer">
          <video
            ref={videoRef}
            controls
            width={videoWidth}
            height={720}
            controlsList="nofullscreen"
            onTimeUpdate={() => {
              setCurrentSecond(videoRef.current?.currentTime ?? 0);
            }}
          >
            <source src={clipSrc} type="video/mp4" />
          </video>
          <VideoCaptions />
          <VideoCaptionsStyling />
        </div>
        <VideoTranscript />
      </VideoPlayerContext.Provider>
    </section>
  );
};

export default VideoPlayer;
