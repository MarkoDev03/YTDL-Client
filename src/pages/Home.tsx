import { useState } from "react";
import Form from "../components/Form/Form";
import { VideoDetails } from "../models/video-details";
import { Video } from "../components/Video/Video";

const Home = () => {
  const [videoData, setVideoData] = useState<VideoDetails | null>(null);
  const [url, setUrl] = useState<string>("");

  return (
    <div className="w-[100%] h-[100%]">
     <Form setVideoData={setVideoData} setUrl={setUrl} />
      {videoData !== null && <Video url={url} setUrl={setUrl} setVideoData={setVideoData} data={videoData} />}
    </div>
  );
};

export default Home;
