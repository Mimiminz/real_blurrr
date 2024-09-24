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

export interface Member {
  profileUrl: string;
  nickname: string;
  carTitle: string;
}

export interface TodayCarItem {
  id: string;
  thumbnail: string;
  member: Member;
  likeCount: number;
}

export interface MyCarItem {
  id: string;
  thumbnail: string;
  member: Member;
  viewCount: number;
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
