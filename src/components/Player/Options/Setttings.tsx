import React, { useState } from "react";
import { MdHighQuality, MdOutlineSpeed } from "react-icons/md";
import { IoChevronBackSharp } from "react-icons/io5";

type Props = {
  isQualityOpen: boolean;
  qualityList: string[];
  setIsQualityOpen: any;
  qualityLevel: string;
  setQualityLevel: any;
  setPlaybackSpeed: any;
  playbackSpeed: number;
  isWide: boolean;
  setIsWide: any;
};

const Setttings: React.FC<Props> = ({
  isQualityOpen,
  qualityList,
  setIsQualityOpen,
  qualityLevel,
  setQualityLevel,
  setPlaybackSpeed,
  playbackSpeed,
}) => {
  const [isPlaybackSpeedOpen, setIsPlaybackSpeedOpen] =
    useState<boolean>(false);

  const playbackSpeeds = [0.25, 0.5, 1, 1.25, 1.5, 2].sort((a, b) => b - a);

  return (
    <div className="settings text-white">
      {!isQualityOpen && !isPlaybackSpeedOpen &&(
        <>
          <div
            className="flex justify-start items-center p-2 setting"
            onClick={() => setIsPlaybackSpeedOpen(true)}
          >
            <MdOutlineSpeed size={20} />
            <p className="ml-2">Playback speed</p>
          </div>
          <div
            className="flex justify-start items-center p-2 setting"
            onClick={() => setIsQualityOpen(true)}
          >
            <MdHighQuality size={20} />
            <p className="ml-2">Quality</p>
          </div>
        </>
      )}
      {isQualityOpen && (
        <section className="w-[100%] quality flex justify-start items-start flex-col">
          <div
            className="w-[100%] flex justify-start items-start setting back"
            onClick={() => setIsQualityOpen(false)}
          >
            <IoChevronBackSharp size={20} /> Quality
          </div>
          {qualityList.map((x, i) => (
            <p
              className={`setting ${qualityLevel === x && "active-quality"}`}
              onClick={() => setQualityLevel(x)}
              key={i}
            >
              {x}
            </p>
          ))}
        </section>
      )}

      {isPlaybackSpeedOpen && (
        <section className="w-[100%] quality flex justify-start items-start flex-col">
          <div
            className="w-[100%] flex justify-start items-start setting back"
            onClick={() => setIsPlaybackSpeedOpen(false)}
          >
            <IoChevronBackSharp size={20} /> Quality
          </div>
          {playbackSpeeds.map((x, i) => (
            <p
              className={`setting ${playbackSpeed === x && "active-quality"}`}
              onClick={() => setPlaybackSpeed(x)}
              key={i}
            >
              {x}
            </p>
          ))}
        </section>
      )}
    </div>
  );
};

export default Setttings;
