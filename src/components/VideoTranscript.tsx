import { useEffect, useRef, useState } from "react";
import { useVideoPlayerContext } from "../hooks/useVideoPlayerContext";
import "./VideoTranscript.css";

const VideoTranscript = () => {
  const { captions, currentCaption, onTranscriptClick } =
    useVideoPlayerContext();
  const listRef = useRef<HTMLUListElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!listRef.current || isHovered) {
      return;
    }
    const currentLi: HTMLLIElement | null =
      listRef.current.querySelector(".current");
    const topOffset = currentLi?.offsetTop;
    if (topOffset != null) {
      listRef.current.scroll({
        top: topOffset,
        behavior: "smooth"
      });
    }
  }, [currentCaption, isHovered]);

  return (
    <section className="videoTranscript">
      <h1 className="heading">Transkript</h1>
      <ul
        ref={listRef}
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {captions.map((caption) => {
          const isCurrentCaption = caption.id === currentCaption?.id;
          return (
            <li
              className={isCurrentCaption ? "current" : ""}
              key={caption.id}
              onClick={() => {
                onTranscriptClick(caption);
              }}
            >
              {caption.timeStartHumanReadable}{" "}
              {caption.text.replace("<br />", " ")}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default VideoTranscript;
