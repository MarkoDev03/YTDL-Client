import { IRange } from "./range";
import ytdl from "ytdl-core";

export class Format {
  url: string;
  isLive: boolean;
  hasAudio: boolean;
  width?: number;
  height?: number;
  mimeType?: string;
  qualityLabel: string;
  initRange?: IRange;
  indexRange?: IRange;
  contentLength: string;
  fps?: number;

  constructor(data: ytdl.videoFormat) {
    this.url = data.url;
    this.isLive = data.isLive;
    this.width = data.width;
    this.height = data.height;
    this.mimeType = data.mimeType;
    this.qualityLabel = data.qualityLabel;
    this.initRange = data.initRange; 
    this.indexRange = data.indexRange; 
    this.contentLength = data.contentLength; 
    this.fps = data.fps; 
    this.hasAudio = data.hasAudio;
  }
}