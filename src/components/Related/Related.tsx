import React, { useEffect, useState } from "react";
import ytdl from "ytdl-core";
import { Axios } from "../../config/axios";
import "./style.css"
import { VideoDetails } from "../../models/video-details";

type Props = {
  url: string;
  setVideoData: any;
  setUrl: any;
  isWide: boolean;
  setIsWide: any;
};

type SubProps = {
  data: ytdl.relatedVideo;
};

const Related: React.FC<Props> = ({ url, setVideoData, setUrl, isWide }) => {
  const [related, setRelated] = useState<ytdl.relatedVideo[] | null>(null);

  useEffect(() => {
    const getRelated = async () => {
      try {
        const { data } = await Axios.get<ytdl.relatedVideo[]>(
          `/video/get-related?videoUrl=${url}`
        );

        setRelated(data);
      } catch (error) {
        console.log(error);
      }
    };

    getRelated();
  }, [url]);

  const RelatedVideo: React.FC<SubProps> = ({ data }) => {
    const thumbnail = data.thumbnails[0];

    const author = data.author as any;

    const formatter = new Intl.NumberFormat("en-GB", {
      notation: "compact",
      compactDisplay: "short",
    });

    const getInfo = async () => {

      const videoData = data as any;

      try {
        const { data } = await Axios.get<VideoDetails | null>(`/video/get-info-by-id?id=${videoData.id}`);
  
        setVideoData(data);
        setUrl(data?.videoUrl);
        
      } catch(error) {
        console.log(error)
      }
    }

    return (
      <div className="flex justify-start items-center related-video" onClick={getInfo}>
        <img
          src={thumbnail.url}
          alt={data.title}
          width={thumbnail.width}
          height={thumbnail.height}
          className="rounded-md related-img"
        />
        <div className="flex justify-start items-start flex-col ml-2">
           <p className="text-sm font-bold truncate-headline">{data.title}</p>
           <p className="text-sm mt-2 opacity-75">{author?.name ?? ""}</p>
           <p className="text-sm opacity-75"><b>{formatter.format(Number(data.view_count) ?? 0)} views</b>&nbsp;&nbsp;{data.published}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex justify-start items-start flex-col">
      {related?.map((data, index) => <RelatedVideo key={index} data={data} />)}
    </div>
  );
};

export default Related;
