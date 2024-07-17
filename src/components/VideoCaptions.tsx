import { useVideoPlayerContext } from "../hooks/useVideoPlayerContext";
import "./VideoCaptions.css";

const VideoCaptions = () => {
  const { currentCaption, captionBackground, captionForeground } =
    useVideoPlayerContext();

  return (
    currentCaption && (
      <div
        className="caption"
        style={{
          color: captionForeground,
          backgroundColor: captionBackground
        }}
        dangerouslySetInnerHTML={{
          __html: `<span>${currentCaption.text}</span>`
        }}
      ></div>
    )
  );
};

export default VideoCaptions;
