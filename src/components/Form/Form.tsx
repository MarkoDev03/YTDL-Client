import React, { useRef } from "react";
import "./style.css";
import { Axios } from "../../config/axios";
import { VideoDetails } from "../../models/video-details";

type Props = {
  setVideoData: any;
  setUrl: any;
};

const Form: React.FC<Props> = ({ setVideoData, setUrl }) => {
  const videoUrlRef = useRef<HTMLInputElement>(null);

  const getVideo = async () => {
    const url = videoUrlRef.current?.value;

    try {
      const { data } = await Axios.get<VideoDetails | null>(`/video/get-info?videoUrl=${url}`);

      setVideoData(data);
      setUrl(url);

      console.log(data)
      
    } catch(error) {
      console.log(error)
    }
  };

  return (
    <div className="w-[100%] flex justify-center items-center flex-col py-[10px] sticky top-0">
      <main className="flex justify-center items-center mt-2">
        <input
          type="text"
          name="videoUrl"
          className="videoUrl"
          placeholder="Paste your link here"
          ref={videoUrlRef}
        />
        <button className="search-button" onClick={getVideo}>
          SEARCH
        </button>
      </main>
    </div>
  );
};

export default Form;
