import { Format } from "./format";
import { IThumbnail } from "./thumbnail";
import ytdl from "ytdl-core";

export class VideoDetails { 
  videoId: string;
  title: string;
  lengthSeconds: string;
  channelId: string;
  description: string | null;
  thumbnails: IThumbnail[];
  views: string;
  author: ytdl.Author;
  category: string;
  likes?: number | null;
  dislikes?: number | null;
  publishDate: string;
  ownerChannelName: string;
  isPrivate: boolean;
  isLiveContent: boolean;
  videoUrl: string;
  formats: Format[];

  constructor(data: ytdl.videoInfo) {
    this.thumbnails = data.videoDetails.thumbnails;
    this.videoId = data.videoDetails.videoId;
    this.title = data.videoDetails.title;
    this.lengthSeconds = data.videoDetails.lengthSeconds;
    this.channelId = data.videoDetails.channelId;
    this.description = data.videoDetails.description;
    this.views = data.videoDetails.viewCount;
    this.author = data.videoDetails.author;
    this.category = data.videoDetails.category;
    this.likes = data.videoDetails.likes;
    this.dislikes = data.videoDetails.dislikes;
    this.publishDate = data.videoDetails.publishDate;
    this.ownerChannelName = data.videoDetails.ownerChannelName;
    this.isPrivate = data.videoDetails.isPrivate;
    this.isLiveContent = data.videoDetails.isLiveContent;
    this.videoUrl = data.videoDetails.video_url;
    this.formats = data.formats.map(x => new Format(x));
  }
}