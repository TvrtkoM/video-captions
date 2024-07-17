import { useSuspenseQuery } from "@tanstack/react-query";
import { Caption } from "../types";

function convertToSeconds(time: string): number {
  const [hh, mm, ssMs] = time.split(":");
  const [ss, ms] = ssMs.split(",");

  const hours = parseInt(hh, 10);
  const minutes = parseInt(mm, 10);
  const seconds = parseInt(ss, 10);
  const milliseconds = parseInt(ms, 10);

  const totalSeconds =
    hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;

  return totalSeconds;
}

function toHumanReadable(time: string): string {
  const [, mm, ssMs] = time.split(":");
  const ss = ssMs.split(",")[0];
  return `${mm}:${ss}`;
}

export default function useCaptions(src: string) {
  const query = useSuspenseQuery<Caption[]>({
    queryKey: ["captions", src],
    queryFn: async () => {
      const captions = fetch(src);
      const text = (await captions).text();
      const captionText = (await text).split(/\r?\n\r?\n/);
      const res = captionText.map((item) => {
        const lines = item.split(/\r?\n/);
        const [timeStart, timeEnd] = lines[1].split(" --> ");
        return {
          id: +lines[0],
          timeStart: convertToSeconds(timeStart),
          timeEnd: convertToSeconds(timeEnd),
          text: lines.slice(2).join("<br />"),
          timeStartHumanReadable: toHumanReadable(timeStart)
        };
      });
      return res;
    }
  });
  return query;
}
