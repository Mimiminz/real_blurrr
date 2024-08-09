import { Option } from "./channelType";

export interface ChennelInfo {
  id: string;
  name: string;
  imgUrl: string;
}

export interface HotBoardItem {
  id: string;
  channel: ChennelInfo;
  title: string;
  likeCount: number;
  commentCount: number;
}

export interface TodayCarItem {
  id: string;
  title: string;
  voteCount: number;
}

export interface Options {
  id: string;
  optionOrder: number;
  content: string;
  voteCount: number;
}

export interface DashCamItem {
  id: string;
  title: string;
  voteCount: number;
  optionCount: number;
  options: Options[];
}
