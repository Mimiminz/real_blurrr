export type DashCamContentData = Pick<DashCamDetail, 'id' | 'member' | 'title' | 'createdAt' | 'videoUrl' | 'content' | 'mentionedLeagues'>;

export interface SimpleMember {
  id: string;
  nickname: string;
  carTitle: string;
}

export interface Member {
  id: string;
  email: string;
  profileUrl: string;
  nickname: string;
  carModel: string;
  carTitle: string;
  carManufacture: string;
}

export interface Mentioned {
   id: string;
   name: string;
 }

export interface DashCams {
  id: string;
  member: SimpleMember;
  title: string;
  viewCount: number;
  commentCount: number;
  likeCount: number;
  createdAt: string;
  videoUrl: string[];
  mentionedLeagues: Mentioned[];
}

export interface DashCamDetail {
   id: string;
   member: SimpleMember;
   title: string;
   viewCount: number;
   commentCount: number;
   likeCount: number;
   createdAt: string; // ISO 날짜 문자열을 가리킴
   videoUrl: string[];
   content: string;
   options: Option;
   mentionedLeagues: Mentioned[];
   comments: Comment[];
 }

 export interface Option {
  num: number;
  content: string;
 }

 export enum CommentStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export interface Comment {
  id: string;
  member: Member;
  content: string;
  createdAt: string;
  status: CommentStatus;
  replies: Reply[];
}

export interface Reply {
  id: string;
  member: Member;
  content: string;
  createdAt: string;
  status: CommentStatus;
}

export interface Channel {
   id: number;
   title: string;
   followers: number;
   tags: string[];
   img: string;
 }