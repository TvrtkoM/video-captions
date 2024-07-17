import { createContext } from "react";
import { Caption } from "../types";

type VideoPlayerContextValue = {
  captions: Caption[];
  currentSecond: number;
  currentCaption?: Caption;
  onTranscriptClick: (caption: Caption) => void;
  captionBackground: string;
  captionForeground: string;
  setCaptionStyle: (background: string, foreground: string) => void;
};

export const VideoPlayerContext = createContext<VideoPlayerContextValue | null>(
  null
);
