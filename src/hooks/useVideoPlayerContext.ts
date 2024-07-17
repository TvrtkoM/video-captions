import { useContext } from "react";
import { VideoPlayerContext } from "../components/VideoPlayerContext";

export const useVideoPlayerContext = () => {
  const ctx = useContext(VideoPlayerContext);
  if (!ctx) {
    throw Error("Must be used within provider");
  }
  return ctx;
};
