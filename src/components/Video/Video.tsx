import React, { useState } from "react";
import { VideoDetails } from "../../models/video-details";
import { MdVerified } from "react-icons/md";
import "./style.css";
import { timeSince } from "../../config/date";
import { Vars } from "../../config/vars";
import Related from "../Related/Related";
import Player from "../Player/Player";

type Props = {
  data: VideoDetails;
  setVideoData: any;
  url: string;
  setUrl: any;
};

export const Video: React.FC<Props> = ({ data, setVideoData, url, setUrl }) => {
  const thumbnails = data.author.thumbnails;

  const [isWide, setIsWide] = useState<boolean>(false);

  const authorThumbnails: any =
    thumbnails !== undefined ? thumbnails[thumbnails.length - 1] : null;

  const formatter = new Intl.NumberFormat("en-GB", {
    notation: "compact",
    compactDisplay: "short",
  });

  return (
    <div className="w-[100%] flex justify-center items-start py-[10px]" style={isWide ? {flexDirection: "column", alignItems: "center"} : {}}>
      <div className="flex justify-center items-center flex-col mr-[30px] video-data" style={isWide ? { position: "relative" } : {}}>
        <article className="flex justify-start items-start flex-col"  style={isWide ? { alignItems: "center"}: {}} >
          <Player data={data} isWide={isWide} setIsWide={setIsWide} />
          <div className="flex justify-start items-start flex-col mt-[10px]" style={isWide ? {width: "80%"}: {}} >
            <h1 className="text-lg font-bold video-width">{data.title}</h1>
            <div className="flex justify-between items-center video-width" style={isWide ? {width: "100%"}: {}}>
              <div className="flex justify-center items-center">
                <b>{formatter.format(Number(data?.views) ?? 0)} views</b>{" "}
                <span className="ml-3">
                  {timeSince(new Date(data.publishDate))}
                </span>
                <p className="text-lg ml-2 bg-[#f00] text-white py-1 px-2 rounded-md my-2">
                  <b>#&nbsp;</b>
                  {data.category}
                </p>
              </div>

              <div className="flex justify-center items-center options">
                <a
                  href={`${Vars.SERVER_URL}/video/download?type=audio&videoUrl=${url}}`}
                  download={true}
                >
                  DOWNLOAD MP3
                </a>
                <a
                  href={`${Vars.SERVER_URL}/video/download?type=video&videoUrl=${url}}`}
                  download={true}
                >
                  DOWNLOAD MP4
                </a>
              </div>
            </div>

            <div className="flex justify-start items-center my-[10px] user-profile">
              <img
                src={authorThumbnails.url}
                alt={data.author.name}
                className="w-[70px] h-[70px] rounded-[150px]"
              />
              <div className="flex justify-start items-start flex-col ml-[10px]">
                <div className="flex justify-center items-center">
                  <p className="text-lg font-bold">{data.author.name}</p>
                  {data.author.verified && (
                    <MdVerified size={20} className="ml-1" color="#f00" />
                  )}
                </div>
                <p className="text-sm">
                  {formatter.format(data.author.subscriber_count ?? 0)}{" "}
                  subscribers
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
     {isWide ? (
       <div className="w-[80%] flex justify-end items-end"> <Related isWide={isWide} setIsWide={setIsWide} setUrl={setUrl} setVideoData={setVideoData} url={url} /></div>
     ) :  <Related isWide={isWide} setIsWide={setIsWide} setUrl={setUrl} setVideoData={setVideoData} url={url} />}
    </div>
  );
};
