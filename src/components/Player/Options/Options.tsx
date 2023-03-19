import React, { useState, useEffect } from "react";
import { GiPauseButton } from "react-icons/gi";
import { IoPlay } from "react-icons/io5";
import { formatVideoDuration } from "../../../utils/time-formatter";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { AiFillSetting } from "react-icons/ai";
import { MdFullscreen, MdOutlineRectangle } from "react-icons/md";
import { VideoDetails } from "../../../models/video-details";
import Setttings from "./Setttings";

type Props = {
  quality: string[];
  audioRef: React.MutableRefObject<HTMLVideoElement | null>;
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  slider: React.MutableRefObject<HTMLInputElement | null>;
  data: VideoDetails;
  currentTime: number;
  qualityLevel: string;
  setQualityLevel: any;
  setPlaybackSpeed: any;
  playbackSpeed: number;
  isWide: boolean;
  setIsWide: any;
};

const Options: React.FC<Props> = ({
  quality,
  audioRef,
  videoRef,
  currentTime,
  slider,
  data,
  qualityLevel,
  setQualityLevel,
  setPlaybackSpeed,
  playbackSpeed,
  isWide,
  setIsWide,
}) => {
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isQualityOpen, setIsQualityOpen] = useState<boolean>(false);

  const qualityList = quality
    .filter((value, index, array) => array.indexOf(value) === index)
    .filter((x) => x !== null);

  useEffect(() => {
    if (isPaused) {
      audioRef.current?.play();
      videoRef.current?.play();
    }

    if (!isPaused) {
      audioRef.current?.pause();
      videoRef.current?.pause();
    }
  }, [isPaused, audioRef, videoRef]);

  useEffect(() => {
    if (isMuted) {
      audioRef.current!.volume = 0;
    }

    if (!isMuted) {
      audioRef.current!.volume = 1;
    }
  }, [isMuted, audioRef]);

  return (
    <div className="video-options video-player-options-show">
      <input
        type="range"
        ref={slider}
        name="range"
        id="range"
        min={0}
        max={data.lengthSeconds}
        className="w-[100%]"
      />
      <div className="flex justify-between items-center w-[100%] h-[50px] px-3">
        <div className="flex justify-start items-center text-white">
          {!isPaused ? (
            <IoPlay
              color="#ffff"
              size={25}
              onClick={() => setIsPaused(true)}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <GiPauseButton
              color="#ffff"
              size={25}
              onClick={() => setIsPaused(false)}
              style={{ cursor: "pointer" }}
            />
          )}
          <div className="ml-4">
            {!isMuted ? (
              <HiSpeakerWave
                color="#ffff"
                size={25}
                onClick={() => setIsMuted(true)}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <HiSpeakerXMark
                color="#ffff"
                size={25}
                onClick={() => setIsMuted(false)}
                style={{ cursor: "pointer" }}
              />
            )}
          </div>
          <p className="ml-4">
            {formatVideoDuration(currentTime)} /{" "}
            {formatVideoDuration(Number(data.lengthSeconds))}
          </p>
        </div>
        <div className="flex justify-start items-center text-white">
          <AiFillSetting
            color="#ffff"
            size={25}
            style={{ cursor: "pointer" }}
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          />
          <MdOutlineRectangle
            color="#ffff"
            size={35}
            className="ml-4"
            style={{ cursor: "pointer" }}
            onClick={() => setIsWide(!isWide)}
          />
          <MdFullscreen
            color="#ffff"
            size={35}
            className="ml-4"
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
      {isSettingsOpen && (
        <Setttings
          isQualityOpen={isQualityOpen}
          qualityList={qualityList}
          setIsQualityOpen={setIsQualityOpen}
          setQualityLevel={setQualityLevel}
          qualityLevel={qualityLevel}
          setPlaybackSpeed={setPlaybackSpeed}
          playbackSpeed={playbackSpeed}
          isWide={isWide}
          setIsWide={setIsWide}
        />
      )}
    </div>
  );
};

export default Options;
