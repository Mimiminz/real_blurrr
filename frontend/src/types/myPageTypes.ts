import { Mentioned, SimpleMember } from "./channelType";

export interface Member {
    profileUrl: string;
    nickname: string;
    carTitle: string;
  }
  
export interface MyHeartItem {
  id: string;
  title: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  viewCount: number;
  member: SimpleMember;
  content?: string; 
  mentions?: Mentioned[]; 
}
  
  export interface MyHeartListResponse {
    boards: MyHeartItem[];
  }

  export interface MyPostItem {
    viewCount: number;
    id: string;
    member: Member;
    title: string;
    createdAt: string;
    commentCount: number;
    likeCount: number;
    totalPages: number;
  }
  
  export interface MyPostListResponse {
    boards: MyPostItem[];
  }