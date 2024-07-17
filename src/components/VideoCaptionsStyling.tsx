import { useVideoPlayerContext } from "../hooks/useVideoPlayerContext";
import "./VideoCaptionsStyling.css";

const VideoCaptionsStyling = () => {
  const { captionBackground, captionForeground, setCaptionStyle } =
    useVideoPlayerContext();
  return (
    <div className="videoCaptionsStyling">
      <h5>Caption colors</h5>
      <div className="colorPicker">
        <input
          type="color"
          id="textColor"
          value={captionForeground}
          onChange={(e) => {
            setCaptionStyle(captionBackground, e.target.value);
          }}
        />
        <label htmlFor="textColor">Text color</label>
      </div>
      <div className="colorPicker">
        <input
          type="color"
          id="backgroundColor"
          value={captionBackground}
          onChange={(e) => {
            setCaptionStyle(e.target.value, captionForeground);
          }}
        />
        <label htmlFor="backgroundColor">Background color</label>
      </div>
    </div>
  );
};

export default VideoCaptionsStyling;
