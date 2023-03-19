import React, { useRef, useEffect, useState } from "react";
import { VideoDetails } from "../../models/video-details";
import { Format } from "../../models/format";
import "./style.css";
import Options from "./Options/Options";

type Props = {
  data: VideoDetails;
};

const Player: React.FC<Props> = ({ data }) => {
  const [currentTime, setCurrentTime] = useState<number>(0);

  const audioRef = useRef<HTMLVideoElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const slider = useRef<HTMLInputElement | null>(null);

  const audioSrc = data.formats.find((x) => x.hasAudio === true) as Format;
  const quality = data.formats
    .map((x) => x.qualityLabel)
    .filter((x) => x !== null)
    .sort((x, y) => {
      return Number(y.replace("p", "")) - Number(x.replace("p", ""));
    }) as string[];

  const [qualityLevel, setQualityLevel] = useState<string>(quality[0]);

  const videoSrc = data.formats.find((x) => x.qualityLabel === qualityLevel) as Format;

  useEffect(() => {
    videoRef.current?.addEventListener("playing", () => {
      audioRef.current!.currentTime = Number(videoRef.current?.currentTime);
      audioRef.current?.play();
    });

    audioRef.current?.addEventListener("timeupdate", () => {
      if (audioRef.current !== null) {
        setCurrentTime(Number(audioRef.current!.currentTime));
      }

      if (slider.current !== null && audioRef.current !== null)
        slider.current.value = audioRef.current.currentTime.toString();
    });

    slider.current?.addEventListener("change", () => {
      let value = slider.current?.value;

      audioRef.current!.currentTime = Number(value);
      videoRef.current!.currentTime = Number(value);
    });
  }, [audioRef, videoRef, slider]);

  useEffect(() => {
    if (audioRef.current !== null && videoRef.current !== null) {
      audioRef.current.currentTime = Number(currentTime);
      videoRef.current.currentTime = Number(currentTime);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qualityLevel, audioRef, videoRef]);

  return (
    <div className="flex justify-center items-center video-width rounded-md player-wrapper">
      <div className="content-wrapper">
        <video
          src={videoSrc?.url}
          width={Number(videoSrc?.width) > 500 ? 1000 : Number(videoSrc?.width)}
          autoPlay={true}
          muted={true}
          ref={videoRef}
          className="video-player-options-show"
        ></video>
      </div>
      <Options
        data={data}
        slider={slider}
        audioRef={audioRef}
        videoRef={videoRef}
        quality={quality}
        currentTime={currentTime}
        setQualityLevel={setQualityLevel}
        qualityLevel={qualityLevel}
      />
      <audio src={audioSrc.url} autoPlay={true} ref={audioRef}></audio>
    </div>
  );
};

export default Player;
