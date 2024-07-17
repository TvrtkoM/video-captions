import { Suspense, useState } from "react";
import "./App.css";
import VideoPlayer from "./components/VideoPlayer";

function App() {
  const [clipSelection, setClipSelection] = useState<"clip1" | "clip2">(
    "clip1"
  );
  return (
    <Suspense fallback="Loading...">
      <div className="buttons">
        <button
          disabled={clipSelection === "clip1"}
          onClick={() => {
            setClipSelection("clip1");
          }}
        >
          Clip 1
        </button>
        <button
          disabled={clipSelection === "clip2"}
          onClick={() => {
            setClipSelection("clip2");
          }}
        >
          Clip 2
        </button>
      </div>
      <div className="app">
        {
          {
            clip1: (
              <VideoPlayer
                clipSrc="/video_1/clip.mp4"
                captionsSrc="/video_1/captions.srt"
                key={clipSelection}
              />
            ),
            clip2: (
              <VideoPlayer
                clipSrc="/video_2/clip.mp4"
                captionsSrc="/video_2/captions.srt"
                key={clipSelection}
              />
            )
          }[clipSelection]
        }
      </div>
    </Suspense>
  );
}

export default App;
